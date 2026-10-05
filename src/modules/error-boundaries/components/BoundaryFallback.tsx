"use client";

import { useErrorBoundariesText, type BoundaryKind } from "../text";
import styles from "./Boundaries.module.css";

export type BoundaryFallbackProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

type BoundaryFallbackOwnProps = BoundaryFallbackProps & {
  // Which error.tsx file rendered this, so the demo shows who caught what.
  boundary: BoundaryKind;
};

// The fallback UI shared by the demo's error.tsx files. Not reported to error
// monitoring on purpose: these errors are triggered by hand.
export function BoundaryFallback({ boundary, error, retry }: BoundaryFallbackOwnProps) {
  const text = useErrorBoundariesText().fallback;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.caughtBy(text.boundaries[boundary])}</h3>
      <p className={styles.alert} role="alert">
        {text.message} {error.message}
      </p>
      <p className={styles.readout}>
        {text.digest} {error.digest ?? text.none}
      </p>
      <button type="button" className={styles.button} onClick={() => retry()}>
        retry()
      </button>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
