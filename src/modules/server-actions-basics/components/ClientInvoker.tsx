"use client";

import { useState, useTransition } from "react";
import { incrementCounter } from "../server/actions";
import styles from "./Actions.module.css";

// A Client Component cannot declare an inline action; it imports one from a
// "use server" file and calls it from an event handler.
export function ClientInvoker() {
  const [isPending, startTransition] = useTransition();
  const [log, setLog] = useState<string[]>([]);

  function incrementThreeTimes() {
    const clickedAt = performance.now();
    setLog([]);

    for (const clickNumber of [1, 2, 3]) {
      startTransition(async () => {
        const result = await incrementCounter();
        const elapsedMs = Math.round(performance.now() - clickedAt);
        setLog((previous) => [
          ...previous,
          `call ${clickNumber} returned count ${result.count} after ${elapsedMs} ms`,
        ]);
      });
    }
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>2. Imported action, called from a handler</h3>
      <button
        type="button"
        className={styles.button}
        onClick={incrementThreeTimes}
        disabled={isPending}
      >
        Call it three times at once
      </button>
      <ol className={styles.log}>
        {log.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ol>
      <p className={styles.hint}>
        Fired together, but dispatched one at a time: each call waits for the
        previous one to finish.
      </p>
    </section>
  );
}
