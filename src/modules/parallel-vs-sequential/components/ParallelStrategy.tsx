import { connection } from "next/server";
import { simulateRequest } from "../server/simulatedRequest";
import { startStopwatch } from "../server/stopwatch";
import { Strategy } from "./Strategy";

// All three requests start immediately; Promise.all waits for the slowest.
export async function ParallelStrategy() {
  await connection();
  const stopwatch = startStopwatch();
  await Promise.all([
    simulateRequest("first"),
    simulateRequest("second"),
    simulateRequest("third"),
  ]);

  return (
    <Strategy
      title="Promise.all"
      hint="The same three requests started together: the time is the slowest one, not the sum."
    >
      took {stopwatch.elapsedMs()} ms
    </Strategy>
  );
}
