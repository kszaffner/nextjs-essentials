import styles from "./Boundaries.module.css";

export function DemoHome() {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Error boundaries</h3>
      <p className={styles.hint}>
        Pick a scenario above. Each failing route has its own error.tsx, and
        this segment has one too (demo/error.tsx) as the parent boundary.
      </p>
    </section>
  );
}
