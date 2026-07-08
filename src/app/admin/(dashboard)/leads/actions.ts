"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function refresh() {
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function toggleLeadRead(id: string, current: boolean) {
  const supabase = await createClient();
  await supabase.from("leads").update({ is_read: !current }).eq("id", id);
  refresh();
}

export async function deleteLead(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("leads").delete().eq("id", id);
  refresh();
}
