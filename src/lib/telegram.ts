type LeadNotification = {
  name: string;
  phone: string;
  company: string | null;
  email: string | null;
  message: string;
};

const TELEGRAM_MESSAGE_LIMIT = 4096;
const MAX_ATTEMPTS = 4;
const REQUEST_TIMEOUT_MS = 8000;

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendTelegramLeadNotification(lead: LeadNotification) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram lead notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return;
  }

  const header = [
    "🔔 <b>Нова заявка з сайту RAKURS TRADE</b>",
    `👤 Ім'я: ${escapeHtml(lead.name)}`,
    `📞 Телефон: ${escapeHtml(lead.phone)}`,
    ...(lead.company ? [`🏢 Компанія: ${escapeHtml(lead.company)}`] : []),
    ...(lead.email ? [`✉️ Email: ${escapeHtml(lead.email)}`] : []),
    "💬 Повідомлення: ",
  ].join("\n");

  // Telegram rejects the whole message (silently, from the app's point of view, unless
  // the response status is checked) if the total text exceeds its hard limit — trim the
  // user-supplied part so a long message can never take down the whole notification.
  const budget = Math.max(0, TELEGRAM_MESSAGE_LIMIT - header.length - 1);
  const escapedMessage = escapeHtml(lead.message);
  const text =
    header + (escapedMessage.length > budget ? `${escapedMessage.slice(0, budget)}…` : escapedMessage);

  const send = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      return await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
  };

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await send();
      if (response.ok) return;

      const body = await response.text();
      console.error(`Telegram lead notification rejected (attempt ${attempt}/${MAX_ATTEMPTS}):`, response.status, body);

      if (response.status === 429) {
        let retryAfterSeconds = 2;
        try {
          retryAfterSeconds = JSON.parse(body)?.parameters?.retry_after ?? retryAfterSeconds;
        } catch {
          // ignore malformed body, fall back to default backoff
        }
        await sleep(retryAfterSeconds * 1000);
        continue;
      }

      if (response.status >= 400 && response.status < 500) return; // non-retryable (bad token/chat/request)
    } catch (error) {
      console.error(`Telegram lead notification failed (attempt ${attempt}/${MAX_ATTEMPTS}):`, error);
    }

    if (attempt < MAX_ATTEMPTS) await sleep(attempt * 1000);
  }
}
