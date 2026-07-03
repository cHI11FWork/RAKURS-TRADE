"use server";

import { createClient } from "@/lib/supabase/server";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !phone || !message) {
    return { status: "error", message: "Будь ласка, заповніть обов'язкові поля: ім'я, телефон і опис задачі." };
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
    return { status: "error", message: "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам." };
  }

  return { status: "success", message: "Дякуємо! Ваша заявка надіслана, ми зв'яжемося з вами найближчим часом." };
}
