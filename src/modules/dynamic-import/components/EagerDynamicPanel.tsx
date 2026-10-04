"use client";

import { useDynamicImportText } from "../text";
import styles from "./Dynamic.module.css";

// DYNAMIC_IMPORT_EAGER_MARKER: rendered on the server too (ssr defaults to
// true), but its code still sits in a separate chunk.
export function EagerDynamicPanel() {
  const text = useDynamicImportText().eager;

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
