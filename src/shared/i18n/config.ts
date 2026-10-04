export const locales = ["pl", "en"] as const;
export type Locale = (typeof locales)[number];

// Polish is the default: a request without a locale prefix lands on /pl.
export const defaultLocale: Locale = "pl";

// Remembers the visitor's last language so a path without a prefix (for
// example a redirect() inside a Server Action) returns to the same language.
export const localeCookieName = "NEXT_LOCALE";

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}
