type LeadNotification = {
  name: string;
  phone: string;
  company: string | null;
  email: string | null;
  message: string;
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegramLeadNotification(lead: LeadNotification) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const lines = [
    "🔔 <b>Нова заявка з сайту RAKURS TRADE</b>",
    `👤 Ім'я: ${escapeHtml(lead.name)}`,
    `📞 Телефон: ${escapeHtml(lead.phone)}`,
  ];
  if (lead.company) lines.push(`🏢 Компанія: ${escapeHtml(lead.company)}`);
  if (lead.email) lines.push(`✉️ Email: ${escapeHtml(lead.email)}`);
  lines.push(`💬 Повідомлення: ${escapeHtml(lead.message)}`);

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
      }),
    });
  } catch (error) {
    console.error("Telegram lead notification failed:", error);
  }
}
