import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { simulateRequest } from "../server/simulatedRequest";
import type { Stopwatch } from "../server/stopwatch";
import { startStopwatch } from "../server/stopwatch";
import { getFetchingStrategiesText } from "../text";
import { Strategy } from "./Strategy";

type WaterfallLevelProps = {
  locale: Locale;
  levelsLeft: number;
  stopwatch: Stopwatch;
};

// Each level fetches, then renders the next level. A child can only start
// once its parent has finished: a waterfall hidden inside the component tree.
async function WaterfallLevel({ locale, levelsLeft, stopwatch }: WaterfallLevelProps) {
  await simulateRequest(`level ${levelsLeft}`);

  if (levelsLeft > 1) {
    return <WaterfallLevel locale={locale} levelsLeft={levelsLeft - 1} stopwatch={stopwatch} />;
  }

  return <>{getFetchingStrategiesText(locale).waterfall.resolved} {stopwatch.elapsedMs()} ms</>;
}

export async function WaterfallStrategy({ locale }: { locale: Locale }) {
  await connection();
  const text = getFetchingStrategiesText(locale);

  return (
    <Strategy title={text.waterfall.title} hint={text.waterfall.hint}>
      <WaterfallLevel locale={locale} levelsLeft={3} stopwatch={startStopwatch()} />
    </Strategy>
  );
}
