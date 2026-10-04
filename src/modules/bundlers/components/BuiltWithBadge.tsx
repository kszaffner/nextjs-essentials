import styles from "./Bundlers.module.css";

// process.env.TURBOPACK is inlined by Next.js at build time (it appears in
// Next's own define list) but is not documented, so treat it as a curiosity
// for this demo, never as an API to build features on.
export function BuiltWithBadge() {
  const bundler = process.env.TURBOPACK ? "Turbopack" : "Webpack";

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>This build was produced by</h3>
      <p className={styles.badge} role="status">
        {bundler}
      </p>
      <p className={styles.hint}>
        Decided when the page was prerendered; the same page rebuilt with the
        other flag says the other name.
      </p>
    </section>
  );
}
