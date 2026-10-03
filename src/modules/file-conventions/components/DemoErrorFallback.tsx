"use client";

import { DemoPanel } from "./DemoPanel";
import styles from "./Demo.module.css";

type DemoErrorFallbackProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// Not reported to error monitoring on purpose: the error is triggered by
// hand in this demo and would only add noise.
export function DemoErrorFallback({ error, retry }: DemoErrorFallbackProps) {
  return (
    <DemoPanel title="This is error.tsx">
      <p role="alert">{error.message}</p>
      <button type="button" className={styles.button} onClick={() => retry()}>
        Try again
      </button>
      <p className={styles.muted}>
        The links above still work: the layout and template sit outside this
        error boundary.
      </p>
    </DemoPanel>
  );
}
