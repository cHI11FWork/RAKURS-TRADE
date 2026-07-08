import { createClient } from "@/lib/supabase/server";
import type {
  AboutContent,
  AboutStat,
  DirectionWithItems,
  Hero,
  HeroFeature,
  SiteSettings,
} from "@/lib/supabase/types";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getHero(): Promise<Hero | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("hero").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getHeroFeatures(): Promise<HeroFeature[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_features")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getDirections(): Promise<DirectionWithItems[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("directions")
    .select("*, direction_items(*)")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  return (data ?? []).map((d) => ({
    ...d,
    items: (d.direction_items ?? [])
      .filter((i: { is_visible: boolean }) => i.is_visible)
      .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order),
  }));
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("about_content").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getAboutStats(): Promise<AboutStat[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("about_stats")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}
