import { notFound } from "next/navigation";
import { SlugView, isKnownSlug, knownSlugs } from "@/modules/not-found";
import { readLocale } from "@/shared/i18n";

export function generateStaticParams() {
  return knownSlugs.map((slug) => ({ slug }));
}

// notFound() runs before anything streams, so the response is a real 404.
export default async function Page({
  params,
}: PageProps<"/[lang]/errors/not-found/demo/[slug]">) {
  const { slug } = await params;
  const locale = await readLocale(params);

  if (!isKnownSlug(slug)) {
    notFound();
  }

  return <SlugView locale={locale} slug={slug} />;
}
