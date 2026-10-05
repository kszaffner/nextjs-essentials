import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { simulateRequest } from "../server/simulatedRequest";
import { startStopwatch } from "../server/stopwatch";
import { getFetchingStrategiesText } from "../text";
import { Strategy } from "./Strategy";

// All three requests start immediately; Promise.all waits for the slowest.
export async function ParallelStrategy({ locale }: { locale: Locale }) {
  await connection();
  const text = getFetchingStrategiesText(locale);
  const stopwatch = startStopwatch();
  await Promise.all([
    simulateRequest("first"),
    simulateRequest("second"),
    simulateRequest("third"),
  ]);

  return (
    <Strategy title={text.parallel.title} hint={text.parallel.hint}>
      {text.took} {stopwatch.elapsedMs()} ms
    </Strategy>
  );
}
