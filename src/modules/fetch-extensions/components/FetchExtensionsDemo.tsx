import { Suspense } from "react";
import { FetchLab } from "./FetchLab";

export function FetchExtensionsDemo() {
  return (
    <Suspense fallback={<p>Calling the demo API…</p>}>
      <FetchLab />
    </Suspense>
  );
}
