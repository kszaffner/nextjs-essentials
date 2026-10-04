import { Suspense } from "react";
import { ServerCrash } from "./ServerCrash";

export function CrashBoundary() {
  return (
    <Suspense fallback={<p>Rendering on the server…</p>}>
      <ServerCrash />
    </Suspense>
  );
}
