"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { moveItem } from "@/lib/reorder";

function refresh() {
  revalidatePath("/admin/directions");
  revalidatePath("/");
}

export async function addDirection() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("directions")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = (data?.[0]?.sort_order ?? 0) + 1;

  await supabase.from("directions").insert({
    icon: "bolt",
    title: "Новий напрям",
    button_text: "Обговорити проєкт",
    button_link: "#contacts",
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateDirection(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("directions")
    .update({
      icon: String(formData.get("icon") ?? "bolt"),
      title: String(formData.get("title") ?? ""),
      button_text: String(formData.get("button_text") ?? ""),
      button_link: String(formData.get("button_link") ?? "#contacts"),
      image_url: String(formData.get("image_url") ?? "") || null,
      enable_lightning_effect: formData.get("enable_lightning_effect") === "on",
    })
    .eq("id", id);
  refresh();
}

export async function deleteDirection(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("directions").delete().eq("id", id);
  refresh();
}

export async function toggleDirection(id: string, current: boolean) {
  const supabase = await createClient();
  await supabase.from("directions").update({ is_visible: !current }).eq("id", id);
  refresh();
}

export async function moveDirection(id: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data } = await supabase.from("directions").select("id, sort_order");
  await moveItem(supabase, "directions", data ?? [], id, direction);
  refresh();
}

export async function addDirectionItem(directionId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("direction_items")
    .select("sort_order")
    .eq("direction_id", directionId)
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = (data?.[0]?.sort_order ?? 0) + 1;

  await supabase.from("direction_items").insert({
    direction_id: directionId,
    text: "Новий пункт",
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateDirectionItem(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("direction_items")
    .update({ text: String(formData.get("text") ?? "") })
    .eq("id", id);
  refresh();
}

export async function deleteDirectionItem(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("direction_items").delete().eq("id", id);
  refresh();
}

export async function toggleDirectionItem(id: string, current: boolean) {
  const supabase = await createClient();
  await supabase.from("direction_items").update({ is_visible: !current }).eq("id", id);
  refresh();
}

export async function moveDirectionItem(directionId: string, id: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data } = await supabase
    .from("direction_items")
    .select("id, sort_order")
    .eq("direction_id", directionId);
  await moveItem(supabase, "direction_items", data ?? [], id, direction);
  refresh();
}
