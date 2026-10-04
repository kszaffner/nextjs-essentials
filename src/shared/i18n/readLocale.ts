import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";

// Turns the [lang] route parameter, which Next.js types as a plain string,
// into a Locale. An unknown language is a 404.
export async function readLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }
  return lang;
}
