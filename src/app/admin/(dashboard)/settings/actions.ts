"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("site_settings")
    .update({
      phone: String(formData.get("phone") ?? ""),
      phone_2: String(formData.get("phone_2") ?? ""),
      email: String(formData.get("email") ?? ""),
      address: String(formData.get("address") ?? ""),
      address_en: String(formData.get("address_en") ?? ""),
      legal_name: String(formData.get("legal_name") ?? ""),
      legal_name_en: String(formData.get("legal_name_en") ?? ""),
      edrpou: String(formData.get("edrpou") ?? ""),
      mailing_address: String(formData.get("mailing_address") ?? ""),
      mailing_address_en: String(formData.get("mailing_address_en") ?? ""),
      telegram_url: String(formData.get("telegram_url") ?? ""),
      whatsapp_url: String(formData.get("whatsapp_url") ?? ""),
      linkedin_url: String(formData.get("linkedin_url") ?? ""),
      instagram_url: String(formData.get("instagram_url") ?? ""),
      footer_note_1: String(formData.get("footer_note_1") ?? ""),
      footer_note_1_en: String(formData.get("footer_note_1_en") ?? ""),
      footer_note_2: String(formData.get("footer_note_2") ?? ""),
      footer_note_2_en: String(formData.get("footer_note_2_en") ?? ""),
    })
    .eq("id", 1);

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
