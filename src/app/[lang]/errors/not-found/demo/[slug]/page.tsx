import { notFound } from "next/navigation";
import { SlugView, isKnownSlug, knownSlugs } from "@/modules/not-found";

export function generateStaticParams() {
  return knownSlugs.map((slug) => ({ slug }));
}

// notFound() runs before anything streams, so the response is a real 404.
export default async function Page({
  params,
}: PageProps<"/[lang]/errors/not-found/demo/[slug]">) {
  const { slug } = await params;

  if (!isKnownSlug(slug)) {
    notFound();
  }

  return <SlugView slug={slug} />;
}
