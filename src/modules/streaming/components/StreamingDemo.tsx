import { Suspense } from "react";
import { PendingBlock } from "./PendingBlock";
import { SlowBlock } from "./SlowBlock";
import styles from "./Streaming.module.css";

const blocks = [
  { label: "Fast", delayMs: 300 },
  { label: "Medium", delayMs: 1200 },
  { label: "Slow", delayMs: 2400 },
] as const;

export function StreamingDemo() {
  return (
    <div>
      <section className={styles.section}>
        <h3 className={styles.heading}>One boundary per block</h3>
        <div className={styles.grid}>
          {blocks.map((block) => (
            <Suspense key={block.label} fallback={<PendingBlock label={block.label} />}>
              <SlowBlock label={block.label} delayMs={block.delayMs} />
            </Suspense>
          ))}
        </div>
        <p className={styles.hint}>
          Each block appears as soon as it is ready: about 0.3 s, 1.2 s, and
          2.4 s after the shell.
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>One shared boundary</h3>
        <Suspense fallback={<PendingBlock label="All three" />}>
          <div className={styles.grid}>
            {blocks.map((block) => (
              <SlowBlock key={block.label} label={block.label} delayMs={block.delayMs} />
            ))}
          </div>
        </Suspense>
        <p className={styles.hint}>
          The boundary resolves when its slowest child does, so all three
          appear together after about 2.4 s (they render in parallel, not one
          after another).
        </p>
      </section>
    </div>
  );
}
