import { Suspense } from "react";
import { WelcomeContent } from "@/modules/validation-and-redirect";

// searchParams is runtime data, so reading it needs a Suspense boundary.
export default function Page({
  searchParams,
}: PageProps<"/server-actions/validation-and-redirect/demo/welcome">) {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <WelcomeContent searchParams={searchParams} />
    </Suspense>
  );
}
