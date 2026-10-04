"use client";

import styles from "./Dynamic.module.css";

// DYNAMIC_IMPORT_EAGER_MARKER: rendered on the server too (ssr defaults to
// true), but its code still sits in a separate chunk.
export function EagerDynamicPanel() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>A dynamic import that is server-rendered</h3>
      <p className={styles.hint}>
        This panel is in the page&apos;s HTML from the start; only its
        JavaScript was split into its own chunk.
      </p>
    </section>
  );
}
