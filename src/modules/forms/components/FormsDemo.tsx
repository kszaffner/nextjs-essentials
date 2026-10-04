import { Suspense } from "react";
import { GuestForm } from "./GuestForm";
import { GuestListView } from "./GuestListView";

export function FormsDemo() {
  return (
    <div>
      <GuestForm />
      <Suspense fallback={<p>Loading the list…</p>}>
        <GuestListView />
      </Suspense>
    </div>
  );
}
