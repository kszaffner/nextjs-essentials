"use client";

import { useState, useTransition } from "react";
import type { Locale } from "@/shared/i18n";
import { incrementCounter } from "../server/actions";
import { getServerActionsBasicsText } from "../text";
import styles from "./Actions.module.css";

// A Client Component cannot declare an inline action; it imports one from a
// "use server" file and calls it from an event handler.
export function ClientInvoker({ locale }: { locale: Locale }) {
  const text = getServerActionsBasicsText(locale).invoker;
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
          text.logEntry(clickNumber, result.count, elapsedMs),
        ]);
      });
    }
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <button
        type="button"
        className={styles.button}
        onClick={incrementThreeTimes}
        disabled={isPending}
      >
        {text.button}
      </button>
      <ol className={styles.log}>
        {log.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ol>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
