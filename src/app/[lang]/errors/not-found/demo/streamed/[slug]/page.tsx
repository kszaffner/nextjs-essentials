import { Suspense } from "react";
import { StreamedLookup } from "@/modules/not-found";

export function generateStaticParams() {
  return [{ slug: "alpha" }];
}

// The check happens inside Suspense, after the shell has streamed, so the
// status code is already 200 by the time notFound() runs.
export default function Page({
  params,
}: PageProps<"/[lang]/errors/not-found/demo/streamed/[slug]">) {
  return (
    <Suspense fallback={<p>Looking the item up…</p>}>
      <StreamedLookup params={params} />
    </Suspense>
  );
}
