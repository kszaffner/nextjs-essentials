import { Suspense } from "react";
import { DynamicPart } from "./DynamicPart";
import styles from "./Rendering.module.css";

export function MixedExample() {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Static shell with a dynamic part</h3>
      <p>This heading and paragraph are in the static shell.</p>
      <Suspense fallback={<p className={styles.hint}>Loading the dynamic part…</p>}>
        <DynamicPart />
      </Suspense>
      <p className={styles.hint}>
        The shell is prerendered; the part behind Suspense streams in per
        request. The build output marks this route with ◐ (Partial
        Prerender).
      </p>
    </section>
  );
}
