import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getFileConventionsText } from "../text";
import { DemoPanel } from "./DemoPanel";

const SIMULATED_DELAY_MS = 1500;

// connection() opts this render out of prerendering, so the delay happens on
// every request and the closest loading.tsx is what the user sees meanwhile.
export async function SlowDemo({ locale }: { locale: Locale }) {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
  const text = getFileConventionsText(locale).slow;

  return (
    <DemoPanel title={text.title}>
      <p>{text.body(SIMULATED_DELAY_MS)}</p>
    </DemoPanel>
  );
}
