import Link from "next/link";
import styles from "./Navigation.module.css";

export function OtherPage() {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Another page</h3>
      <p className={styles.hint}>
        You arrived by navigation. <Link href="/fundamentals/navigation/demo">Back to the playground</Link>
      </p>
    </section>
  );
}
