"use server";

import { createClient } from "@/lib/supabase/server";
import { dictionaries } from "@/lib/i18n/dictionary";
import { isLocale } from "@/lib/i18n/locale";

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

  if (!name || !phone || !message) {
    return { status: "error", message: dict.errorRequired };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name,
    phone,
    company: company || null,
    email: email || null,
    message,
  });

  if (error) {
    return { status: "error", message: dict.errorFailed };
  }

  return { status: "success", message: dict.success };
}
