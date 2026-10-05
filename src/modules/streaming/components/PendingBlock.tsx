import type { Locale } from "@/shared/i18n";
import { getStreamingText } from "../text";
import styles from "./Streaming.module.css";

type PendingBlockProps = {
  label: string;
  locale: Locale;
};

export function PendingBlock({ label, locale }: PendingBlockProps) {
  return (
    <div className={`${styles.block} ${styles.pending}`}>
      <strong>{label}</strong>
      <p>{getStreamingText(locale).waiting}</p>
    </div>
  );
}
