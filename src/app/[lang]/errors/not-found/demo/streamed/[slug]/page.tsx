import { Suspense } from "react";
import { StreamedLookup, getStreamedLookupText } from "@/modules/not-found";
import { readLocale } from "@/shared/i18n";

export function generateStaticParams() {
  return [{ slug: "alpha" }];
}

// The check happens inside Suspense, after the shell has streamed, so the
// status code is already 200 by the time notFound() runs.
export default async function Page({
  params,
}: PageProps<"/[lang]/errors/not-found/demo/streamed/[slug]">) {
  const locale = await readLocale(params);

  return (
    <Suspense fallback={<p>{getStreamedLookupText(locale)}</p>}>
      <StreamedLookup locale={locale} params={params} />
    </Suspense>
  );
}
