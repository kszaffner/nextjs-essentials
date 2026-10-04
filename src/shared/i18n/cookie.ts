import { cookies } from "next/headers";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "./config";

// The language the proxy last saw this visitor use. For code that cannot read
// the [lang] root parameter (Server Actions, Route Handlers).
export async function getCookieLocale(): Promise<Locale> {
  const value = (await cookies()).get(localeCookieName)?.value;
  return isLocale(value) ? value : defaultLocale;
}
