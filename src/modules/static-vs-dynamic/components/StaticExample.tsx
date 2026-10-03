import styles from "./Rendering.module.css";

// Only predictable values: a literal and a pure computation. Both complete
// at build time, so the whole route is part of the static shell.
const KIBIBYTE = 2 ** 10;

export function StaticExample() {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Static route</h3>
      <ul className={styles.facts}>
        <li>A literal and a pure computation: 2 ** 10 = {KIBIBYTE}</li>
        <li>Nothing here depends on the request.</li>
      </ul>
      <p className={styles.hint}>
        Prerendered at build time and served as HTML from the CDN. The build
        output marks this route with ○ (Static).
      </p>
    </section>
  );
}
