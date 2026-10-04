// Client-safe and test-safe API. getCookieLocale needs next/headers, so it is
// imported from "@/shared/i18n/cookie" by the Server Actions that use it.
export { defaultLocale, isLocale, localeCookieName, locales, type Locale } from "./config";
export { LanguageSwitcher } from "./LanguageSwitcher";
export { LocaleProvider, useLocale, useLocalizedPath } from "./LocaleProvider";
export { LocalizedAnchor, LocalizedLink } from "./LocalizedLink";
export { readLocale } from "./readLocale";
export { messages, type Messages } from "./messages";
export { localizePath, resolveLocaleRedirect, splitLocale, switchLocalePath } from "./paths";
