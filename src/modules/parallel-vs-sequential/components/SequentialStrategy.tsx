import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { simulateRequest } from "../server/simulatedRequest";
import { startStopwatch } from "../server/stopwatch";
import { getFetchingStrategiesText } from "../text";
import { Strategy } from "./Strategy";

// Each await starts only after the previous one finished.
export async function SequentialStrategy({ locale }: { locale: Locale }) {
  await connection();
  const text = getFetchingStrategiesText(locale);
  const stopwatch = startStopwatch();
  await simulateRequest("first");
  await simulateRequest("second");
  await simulateRequest("third");

  return (
    <Strategy title={text.sequential.title} hint={text.sequential.hint}>
      {text.took} {stopwatch.elapsedMs()} ms
    </Strategy>
  );
}
