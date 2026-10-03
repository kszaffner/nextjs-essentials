import { connection } from "next/server";
import { simulateRequest } from "../server/simulatedRequest";
import { startStopwatch } from "../server/stopwatch";
import { Strategy } from "./Strategy";

// Each await starts only after the previous one finished.
export async function SequentialStrategy() {
  await connection();
  const stopwatch = startStopwatch();
  await simulateRequest("first");
  await simulateRequest("second");
  await simulateRequest("third");

  return (
    <Strategy
      title="Sequential awaits"
      hint="Three independent requests awaited one after another: the delays add up."
    >
      took {stopwatch.elapsedMs()} ms
    </Strategy>
  );
}
