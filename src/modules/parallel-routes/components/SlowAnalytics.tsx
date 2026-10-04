import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getParallelRoutesText } from "../text";
import { SlotPanel } from "./SlotPanel";

const SIMULATED_DELAY_MS = 1500;

// Slow on purpose: the @analytics slot streams in with its own loading.tsx
// while the other slots are already on screen.
export async function SlowAnalytics({ locale }: { locale: Locale }) {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
  const { analytics } = getParallelRoutesText(locale);

  return (
    <SlotPanel slotName={analytics.slotName} title={analytics.title}>
      <p>{analytics.body(SIMULATED_DELAY_MS)}</p>
    </SlotPanel>
  );
}
