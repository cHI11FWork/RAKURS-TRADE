import type { Locale } from "./locale";

/** Picks the localized value of a bilingual field, falling back to Ukrainian if English is empty. */
export function pick(uk: string, en: string | null | undefined, locale: Locale): string {
  if (locale === "en" && en && en.trim().length > 0) return en;
  return uk;
}
