import { connection } from "next/server";
import { Suspense } from "react";
import { simulateRequest } from "../server/simulatedRequest";
import { startStopwatch } from "../server/stopwatch";
import type { Stopwatch } from "../server/stopwatch";
import { Strategy } from "./Strategy";

type SiblingProps = {
  label: string;
  stopwatch: Stopwatch;
};

async function Sibling({ label, stopwatch }: SiblingProps) {
  await simulateRequest(label);
  return <span>{label}: {stopwatch.elapsedMs()} ms </span>;
}

export async function SiblingStrategy() {
  await connection();
  const stopwatch = startStopwatch();

  return (
    <Strategy
      title="Sibling components, each fetching"
      hint="Components next to each other fetch at the same time, each behind its own Suspense boundary, and appear as they resolve."
    >
      {["first", "second", "third"].map((label) => (
        <Suspense key={label} fallback={<span>{label}… </span>}>
          <Sibling label={label} stopwatch={stopwatch} />
        </Suspense>
      ))}
    </Strategy>
  );
}
