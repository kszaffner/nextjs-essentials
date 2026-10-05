import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { Suspense } from "react";
import { simulateRequest } from "../server/simulatedRequest";
import { startStopwatch } from "../server/stopwatch";
import type { Stopwatch } from "../server/stopwatch";
import { getFetchingStrategiesText } from "../text";
import { Strategy } from "./Strategy";

type SiblingProps = {
  label: string;
  stopwatch: Stopwatch;
};

async function Sibling({ label, stopwatch }: SiblingProps) {
  await simulateRequest(label);
  return <span>{label}: {stopwatch.elapsedMs()} ms </span>;
}

export async function SiblingStrategy({ locale }: { locale: Locale }) {
  await connection();
  const text = getFetchingStrategiesText(locale);
  const stopwatch = startStopwatch();

  return (
    <Strategy title={text.siblings.title} hint={text.siblings.hint}>
      {["first", "second", "third"].map((label) => (
        <Suspense key={label} fallback={<span>{label}… </span>}>
          <Sibling label={label} stopwatch={stopwatch} />
        </Suspense>
      ))}
    </Strategy>
  );
}
