import type { SupabaseClient } from "@supabase/supabase-js";

type Sortable = { id: string; sort_order: number };

export async function moveItem(
  supabase: SupabaseClient,
  table: string,
  rows: Sortable[],
  id: string,
  direction: "up" | "down"
) {
  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);
  const index = sorted.findIndex((r) => r.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= sorted.length) return;

  const current = sorted[index];
  const swapWith = sorted[swapIndex];

  await supabase.from(table).update({ sort_order: swapWith.sort_order }).eq("id", current.id);
  await supabase.from(table).update({ sort_order: current.sort_order }).eq("id", swapWith.id);
}
