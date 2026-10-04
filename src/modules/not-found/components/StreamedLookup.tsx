import { notFound } from "next/navigation";
import { connection } from "next/server";
import { isKnownSlug } from "../knownSlugs";
import { SlugView } from "./SlugView";

type StreamedLookupProps = {
  params: Promise<{ slug: string }>;
};

// Runs inside a Suspense boundary after connection(), i.e. after the shell
// has started streaming: the HTTP status is already sent.
export async function StreamedLookup({ params }: StreamedLookupProps) {
  await connection();
  const { slug } = await params;

  if (!isKnownSlug(slug)) {
    notFound();
  }

  return <SlugView slug={slug} />;
}
