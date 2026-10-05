import { notFound } from "next/navigation";
import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { isKnownSlug } from "../knownSlugs";
import { SlugView } from "./SlugView";

type StreamedLookupProps = {
  locale: Locale;
  params: Promise<{ slug: string }>;
};

// Runs inside a Suspense boundary after connection(), i.e. after the shell
// has started streaming: the HTTP status is already sent.
export async function StreamedLookup({ locale, params }: StreamedLookupProps) {
  await connection();
  const { slug } = await params;

  if (!isKnownSlug(slug)) {
    notFound();
  }

  return <SlugView locale={locale} slug={slug} />;
}
