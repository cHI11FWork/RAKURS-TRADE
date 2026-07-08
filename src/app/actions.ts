"use server";

import { createClient } from "@/lib/supabase/server";
import { dictionaries } from "@/lib/i18n/dictionary";
import { isLocale } from "@/lib/i18n/locale";
import { sendTelegramLeadNotification } from "@/lib/telegram";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const localeValue = formData.get("locale");
  const locale = isLocale(String(localeValue ?? "")) ? String(localeValue) : "uk";
  const dict = dictionaries[locale as "uk" | "en"].site.contact;

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent") === "on";

  if (!name || !phone || !message) {
    return { status: "error", message: dict.errorRequired };
  }

  if (!consent) {
    return { status: "error", message: dict.errorConsent };
  }

  const supabase = await createClient();
  const { data: leadNumber, error } = await supabase.rpc("submit_lead", {
    p_name: name,
    p_phone: phone,
    p_company: company || null,
    p_email: email || null,
    p_message: message,
  });

  if (error) {
    return { status: "error", message: dict.errorFailed };
  }

  await sendTelegramLeadNotification({
    name,
    phone,
    company: company || null,
    email: email || null,
    message,
    leadNumber: typeof leadNumber === "number" ? leadNumber : null,
    submittedAt: new Date(),
  });

  return { status: "success", message: dict.success };
}
