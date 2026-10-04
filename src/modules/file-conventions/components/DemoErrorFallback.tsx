"use client";

import { useFileConventionsText } from "../text";
import { DemoPanel } from "./DemoPanel";
import styles from "./Demo.module.css";

type DemoErrorFallbackProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// Not reported to error monitoring on purpose: the error is triggered by
// hand in this demo and would only add noise.
export function DemoErrorFallback({ error, retry }: DemoErrorFallbackProps) {
  const text = useFileConventionsText().error;

  return (
    <DemoPanel title={text.title}>
      <p role="alert">{error.message}</p>
      <button type="button" className={styles.button} onClick={() => retry()}>
        {text.retry}
      </button>
      <p className={styles.muted}>{text.hint}</p>
    </DemoPanel>
  );
}
