import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getStreamingText } from "../text";
import { PendingBlock } from "./PendingBlock";
import { SlowBlock } from "./SlowBlock";
import styles from "./Streaming.module.css";

const blocks = [
  { key: "fast", delayMs: 300 },
  { key: "medium", delayMs: 1200 },
  { key: "slow", delayMs: 2400 },
] as const;

export function StreamingDemo({ locale }: { locale: Locale }) {
  const text = getStreamingText(locale);

  return (
    <div>
      <section className={styles.section}>
        <h3 className={styles.heading}>{text.separate.title}</h3>
        <div className={styles.grid}>
          {blocks.map((block) => (
            <Suspense key={block.key} fallback={<PendingBlock label={text.blocks[block.key]} locale={locale} />}>
              <SlowBlock label={text.blocks[block.key]} delayMs={block.delayMs} locale={locale} />
            </Suspense>
          ))}
        </div>
        <p className={styles.hint}>{text.separate.hint}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>{text.shared.title}</h3>
        <Suspense fallback={<PendingBlock label={text.blocks.all} locale={locale} />}>
          <div className={styles.grid}>
            {blocks.map((block) => (
              <SlowBlock key={block.key} label={text.blocks[block.key]} delayMs={block.delayMs} locale={locale} />
            ))}
          </div>
        </Suspense>
        <p className={styles.hint}>{text.shared.hint}</p>
      </section>
    </div>
  );
}
