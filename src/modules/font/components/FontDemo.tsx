import { lora } from "../fonts";
import { FontReport } from "./FontReport";
import styles from "./Font.module.css";

export function FontDemo() {
  return (
    <div className={lora.variable}>
      <section className={styles.section}>
        <h3 className={styles.title}>Three fonts on one page</h3>
        <p className={`${styles.sample} ${styles.sans}`} data-font-sample="site sans (Geist, from the root layout)">
          The site font: Geist, loaded once by the root layout.
        </p>
        <p className={`${styles.sample} ${styles.mono}`} data-font-sample="site mono (Geist Mono, from the root layout)">
          Monospace: Geist Mono for code and numbers.
        </p>
        <p className={`${styles.sample} ${styles.serif}`} data-font-sample="Lora (loaded by this page only)">
          A serif: Lora, loaded only by this page.
        </p>
        <p className={styles.hint}>
          Lora&apos;s files were fetched at build time and are served from this
          site, with a size-adjusted fallback font so the swap does not move
          the text.
        </p>
      </section>
      <FontReport />
    </div>
  );
}
