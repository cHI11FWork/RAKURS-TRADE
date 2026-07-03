import { createClient } from "@/lib/supabase/server";
import type {
  AboutContent,
  AboutStat,
  DirectionWithItems,
  Hero,
  HeroFeature,
  Lead,
  SiteSettings,
} from "@/lib/supabase/types";

export async function getSiteSettingsAdmin(): Promise<SiteSettings | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getHeroAdmin(): Promise<Hero | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("hero").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getHeroFeaturesAdmin(): Promise<HeroFeature[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_features")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getDirectionsAdmin(): Promise<DirectionWithItems[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("directions")
    .select("*, direction_items(*)")
    .order("sort_order", { ascending: true });

  return (data ?? []).map((d) => ({
    ...d,
    items: (d.direction_items ?? []).sort(
      (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
    ),
  }));
}

export async function getAboutContentAdmin(): Promise<AboutContent | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("about_content").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getAboutStatsAdmin(): Promise<AboutStat[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("about_stats")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getLeadsAdmin(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getUnreadLeadsCount(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);
  return count ?? 0;
}
