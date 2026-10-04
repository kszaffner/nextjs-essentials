"use client";

import styles from "./Boundaries.module.css";

export type BoundaryFallbackProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

type BoundaryFallbackOwnProps = BoundaryFallbackProps & {
  // Which error.tsx file rendered this, so the demo shows who caught what.
  boundary: string;
};

// The fallback UI shared by the demo's error.tsx files. Not reported to error
// monitoring on purpose: these errors are triggered by hand.
export function BoundaryFallback({ boundary, error, retry }: BoundaryFallbackOwnProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Caught by {boundary}</h3>
      <p className={styles.alert} role="alert">
        message the browser received: {error.message}
      </p>
      <p className={styles.readout}>digest: {error.digest ?? "(none)"}</p>
      <button type="button" className={styles.button} onClick={() => retry()}>
        retry()
      </button>
      <p className={styles.hint}>
        The navigation above still works: the layouts around this boundary kept
        rendering.
      </p>
    </section>
  );
}
