"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { moveItem } from "@/lib/reorder";

function refresh() {
  revalidatePath("/admin/about");
  revalidatePath("/");
}

export async function updateAboutContent(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("about_content")
    .update({
      heading: String(formData.get("heading") ?? ""),
      paragraph_1: String(formData.get("paragraph_1") ?? ""),
      paragraph_2: String(formData.get("paragraph_2") ?? ""),
    })
    .eq("id", 1);
  refresh();
}

export async function addAboutStat() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("about_stats")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = (data?.[0]?.sort_order ?? 0) + 1;

  await supabase.from("about_stats").insert({
    icon: "calendar",
    number_text: "0+",
    label_text: "Новий показник",
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateAboutStat(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("about_stats")
    .update({
      icon: String(formData.get("icon") ?? "calendar"),
      number_text: String(formData.get("number_text") ?? ""),
      label_text: String(formData.get("label_text") ?? ""),
    })
    .eq("id", id);
  refresh();
}

export async function deleteAboutStat(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("about_stats").delete().eq("id", id);
  refresh();
}

export async function toggleAboutStat(id: string, current: boolean) {
  const supabase = await createClient();
  await supabase.from("about_stats").update({ is_visible: !current }).eq("id", id);
  refresh();
}

export async function moveAboutStat(id: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data } = await supabase.from("about_stats").select("id, sort_order");
  await moveItem(supabase, "about_stats", data ?? [], id, direction);
  refresh();
}
