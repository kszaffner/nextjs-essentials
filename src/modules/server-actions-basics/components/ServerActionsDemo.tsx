import { Suspense } from "react";
import { ClientInvoker } from "./ClientInvoker";
import { CounterDisplay } from "./CounterDisplay";
import { InlineActionForm } from "./InlineActionForm";

export function ServerActionsDemo() {
  return (
    <div>
      <Suspense fallback={<p>Reading the counter…</p>}>
        <CounterDisplay />
      </Suspense>
      <InlineActionForm />
      <ClientInvoker />
    </div>
  );
}
