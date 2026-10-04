"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "./config";
import { localizePath } from "./paths";

const LocaleContext = createContext<Locale>(defaultLocale);

// Client Components cannot call the root-params getter, so the layout passes
// the locale down once through context.
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

// For imperative navigation (router.push, fetch of a page): adds the current
// language prefix to an internal path.
export function useLocalizedPath(): (path: string) => string {
  const locale = useLocale();
  return (path) => localizePath(locale, path);
}
