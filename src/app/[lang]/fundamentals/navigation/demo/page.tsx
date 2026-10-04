import { Suspense } from "react";
import { NavigationPlayground, ServerClock } from "@/modules/navigation";

// useSearchParams() and per-request rendering are runtime data under Cache
// Components, so each needs its own Suspense boundary.
export default function Page() {
  return (
    <>
      <Suspense fallback={<p>Loading the playground…</p>}>
        <NavigationPlayground />
      </Suspense>
      <Suspense fallback={<p>Rendering on the server…</p>}>
        <ServerClock />
      </Suspense>
    </>
  );
}
