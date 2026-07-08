export type Locale = "uk" | "en";

export const DEFAULT_LOCALE: Locale = "uk";
export const LOCALES: Locale[] = ["uk", "en"];
export const LOCALE_COOKIE = "locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "uk" || value === "en";
}
