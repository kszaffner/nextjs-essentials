import { defaultLocale, isLocale, type Locale } from "./config";

export type SplitPath = {
  locale: Locale | undefined;
  // The path without its locale prefix, always starting with "/".
  path: string;
};

export function splitLocale(pathname: string): SplitPath {
  const [, firstSegment = "", ...rest] = pathname.split("/");
  if (!isLocale(firstSegment)) {
    return { locale: undefined, path: pathname };
  }
  return { locale: firstSegment, path: `/${rest.join("/")}` };
}

// "/data/isr" -> "/en/data/isr". A path that already carries a locale prefix,
// an external URL, or a bare query/hash is returned untouched.
export function localizePath(locale: Locale, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    return path;
  }
  if (splitLocale(path.split(/[?#]/)[0] ?? path).locale) {
    return path;
  }
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

// The same page in another language, keeping the rest of the path.
export function switchLocalePath(pathname: string, locale: Locale): string {
  return localizePath(locale, splitLocale(pathname).path);
}

type LocaleRedirectInput = {
  pathname: string;
  search: string;
  cookieLocale: string | undefined;
};

// Where a request without a locale prefix should go; undefined when the path
// already has one. Kept pure so proxy.ts only turns it into a response.
export function resolveLocaleRedirect({
  pathname,
  search,
  cookieLocale,
}: LocaleRedirectInput): string | undefined {
  if (splitLocale(pathname).locale) {
    return undefined;
  }
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  return `${localizePath(locale, pathname)}${search}`;
}
