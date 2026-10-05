"use client";

import { useState } from "react";
import { useErrorBoundariesText } from "../text";
import styles from "./Boundaries.module.css";

function riskyOperation(): never {
  throw new Error("Deliberate error from an event handler");
}

// Error boundaries only catch errors thrown while React renders. An error
// thrown in an event handler never reaches one, so handle it where it happens.
export function EventHandlerDemo() {
  const text = useErrorBoundariesText().eventHandler;
  const [handledMessage, setHandledMessage] = useState(text.initial);

  function throwUnhandled() {
    riskyOperation();
  }

  function throwHandled() {
    try {
      riskyOperation();
    } catch (error) {
      // Translate into something the user sees: we can act on it here.
      setHandledMessage(error instanceof Error ? `${text.handledPrefix} ${error.message}` : text.unknown);
    }
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <button type="button" className={styles.button} onClick={throwUnhandled}>
        {text.unhandled}
      </button>
      <button type="button" className={styles.button} onClick={throwHandled}>
        {text.handled}
      </button>
      <p className={styles.readout} role="status">
        {handledMessage}
      </p>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
