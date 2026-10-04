import styles from "./Navigation.module.css";
import { LocalizedLink } from "@/shared/i18n";

export function OtherPage() {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Another page</h3>
      <p className={styles.hint}>
        You arrived by navigation. <LocalizedLink href="/fundamentals/navigation/demo">Back to the playground</LocalizedLink>
      </p>
    </section>
  );
}
