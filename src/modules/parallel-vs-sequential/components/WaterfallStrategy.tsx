import { connection } from "next/server";
import { simulateRequest } from "../server/simulatedRequest";
import type { Stopwatch } from "../server/stopwatch";
import { startStopwatch } from "../server/stopwatch";
import { Strategy } from "./Strategy";

type WaterfallLevelProps = {
  levelsLeft: number;
  stopwatch: Stopwatch;
};

// Each level fetches, then renders the next level. A child can only start
// once its parent has finished: a waterfall hidden inside the component tree.
async function WaterfallLevel({ levelsLeft, stopwatch }: WaterfallLevelProps) {
  await simulateRequest(`level ${levelsLeft}`);

  if (levelsLeft > 1) {
    return <WaterfallLevel levelsLeft={levelsLeft - 1} stopwatch={stopwatch} />;
  }

  return <>last level resolved after {stopwatch.elapsedMs()} ms</>;
}

export async function WaterfallStrategy() {
  await connection();

  return (
    <Strategy
      title="Nested components, each fetching"
      hint="Three levels, each waiting for its parent before it fetches: a waterfall, even though the requests are independent."
    >
      <WaterfallLevel levelsLeft={3} stopwatch={startStopwatch()} />
    </Strategy>
  );
}
