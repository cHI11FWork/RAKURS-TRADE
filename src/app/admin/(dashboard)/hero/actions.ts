"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { moveItem } from "@/lib/reorder";

function refresh() {
  revalidatePath("/admin/hero");
  revalidatePath("/");
}

export async function updateHero(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("hero")
    .update({
      title_main: String(formData.get("title_main") ?? ""),
      title_highlight: String(formData.get("title_highlight") ?? ""),
      subtitle: String(formData.get("subtitle") ?? ""),
      cta_text: String(formData.get("cta_text") ?? ""),
      cta_link: String(formData.get("cta_link") ?? "#contacts"),
      background_image_url: String(formData.get("background_image_url") ?? "") || null,
    })
    .eq("id", 1);
  refresh();
}

export async function addHeroFeature() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_features")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = (data?.[0]?.sort_order ?? 0) + 1;

  await supabase.from("hero_features").insert({
    icon: "shield",
    title: "Нова перевага",
    subtitle: "Опис переваги",
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateHeroFeature(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("hero_features")
    .update({
      icon: String(formData.get("icon") ?? "shield"),
      title: String(formData.get("title") ?? ""),
      subtitle: String(formData.get("subtitle") ?? ""),
    })
    .eq("id", id);
  refresh();
}

export async function deleteHeroFeature(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("hero_features").delete().eq("id", id);
  refresh();
}

export async function toggleHeroFeature(id: string, current: boolean) {
  const supabase = await createClient();
  await supabase.from("hero_features").update({ is_visible: !current }).eq("id", id);
  refresh();
}

export async function moveHeroFeature(id: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data } = await supabase.from("hero_features").select("id, sort_order");
  await moveItem(supabase, "hero_features", data ?? [], id, direction);
  refresh();
}
