import { connection } from "next/server";
import { SlotPanel } from "./SlotPanel";

const SIMULATED_DELAY_MS = 1500;

// Slow on purpose: the @analytics slot streams in with its own loading.tsx
// while the other slots are already on screen.
export async function SlowAnalytics() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  return (
    <SlotPanel slotName="@analytics/page.tsx" title="Analytics">
      <p>Rendered after {SIMULATED_DELAY_MS} ms, independently of the other slots.</p>
    </SlotPanel>
  );
}
