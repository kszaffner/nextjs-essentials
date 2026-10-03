import { Suspense } from "react";
import { LookupReport } from "./LookupReport";

export function MigrationDemo() {
  return (
    <Suspense fallback={<p>Looking up users…</p>}>
      <LookupReport />
    </Suspense>
  );
}
