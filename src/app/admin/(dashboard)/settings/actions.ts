"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("site_settings")
    .update({
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      address: String(formData.get("address") ?? ""),
      telegram_url: String(formData.get("telegram_url") ?? ""),
      whatsapp_url: String(formData.get("whatsapp_url") ?? ""),
      linkedin_url: String(formData.get("linkedin_url") ?? ""),
      footer_note_1: String(formData.get("footer_note_1") ?? ""),
      footer_note_2: String(formData.get("footer_note_2") ?? ""),
    })
    .eq("id", 1);

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
