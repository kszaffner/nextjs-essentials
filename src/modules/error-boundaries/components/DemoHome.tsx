import type { Locale } from "@/shared/i18n";
import { getErrorBoundariesText } from "../text";
import styles from "./Boundaries.module.css";

export function DemoHome({ locale }: { locale: Locale }) {
  const text = getErrorBoundariesText(locale).home;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
