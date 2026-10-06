import type { Locale } from "@/shared/i18n";
import { lora } from "../fonts";
import { getFontText } from "../text";
import { FontReport } from "./FontReport";
import styles from "./Font.module.css";

export function FontDemo({ locale }: { locale: Locale }) {
  const text = getFontText(locale);

  return (
    <div className={lora.variable}>
      <section className={styles.section}>
        <h3 className={styles.title}>{text.title}</h3>
        <p className={`${styles.sample} ${styles.sans}`} data-font-sample={text.sampleLabels.sans}>
          {text.samples.sans}
        </p>
        <p className={`${styles.sample} ${styles.mono}`} data-font-sample={text.sampleLabels.mono}>
          {text.samples.mono}
        </p>
        <p className={`${styles.sample} ${styles.serif}`} data-font-sample={text.sampleLabels.serif}>
          {text.samples.serif}
        </p>
        <p className={styles.hint}>{text.hint}</p>
      </section>
      <FontReport />
    </div>
  );
}
