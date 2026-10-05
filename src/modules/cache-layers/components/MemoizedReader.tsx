import type { Locale } from "@/shared/i18n";
import { loadMemoizedRun } from "../server/layerCounters";
import { getCacheLayersText } from "../text";

type MemoizedReaderProps = {
  locale: Locale;
  label: string;
};

export async function MemoizedReader({ locale, label }: MemoizedReaderProps) {
  const { run } = await loadMemoizedRun();

  return (
    <span>
      {label} {getCacheLayersText(locale).memoization.saw} #{run}{" "}
    </span>
  );
}
