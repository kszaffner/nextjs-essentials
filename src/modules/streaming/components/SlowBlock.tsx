import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getStreamingText } from "../text";
import styles from "./Streaming.module.css";

type SlowBlockProps = {
  label: string;
  delayMs: number;
  locale: Locale;
};

// connection() makes the render per-request, so the delay really happens
// while the response is being streamed.
export async function SlowBlock({ label, delayMs, locale }: SlowBlockProps) {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  return (
    <div className={styles.block}>
      <strong>{label}</strong>
      <p>{getStreamingText(locale).resolvedAfter(delayMs)}</p>
    </div>
  );
}
