import { Suspense } from "react";
import { Collapsible } from "./Collapsible";
import { ServerFactsPanel } from "./ServerFactsPanel";

// This Server Component owns the composition: it imports both pieces and
// nests one inside the other, so the client file never imports server code.
export function CompositionDemo() {
  return (
    <Collapsible title="A Client Component wrapping a Server Component">
      <Suspense fallback={<p>Rendering on the server…</p>}>
        <ServerFactsPanel />
      </Suspense>
    </Collapsible>
  );
}
