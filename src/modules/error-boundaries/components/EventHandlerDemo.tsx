"use client";

import { useState } from "react";
import styles from "./Boundaries.module.css";

function riskyOperation(): never {
  throw new Error("Deliberate error from an event handler");
}

// Error boundaries only catch errors thrown while React renders. An error
// thrown in an event handler never reaches one, so handle it where it happens.
export function EventHandlerDemo() {
  const [handledMessage, setHandledMessage] = useState("nothing has happened yet");

  function throwUnhandled() {
    riskyOperation();
  }

  function throwHandled() {
    try {
      riskyOperation();
    } catch (error) {
      // Translate into something the user sees: we can act on it here.
      setHandledMessage(error instanceof Error ? `handled: ${error.message}` : "handled: unknown error");
    }
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Event handler errors</h3>
      <button type="button" className={styles.button} onClick={throwUnhandled}>
        Throw without try/catch
      </button>
      <button type="button" className={styles.button} onClick={throwHandled}>
        Throw with try/catch
      </button>
      <p className={styles.readout} role="status">
        {handledMessage}
      </p>
      <p className={styles.hint}>
        The first button reports an error in the console, but no error.tsx
        appears and the page stays as it is.
      </p>
    </section>
  );
}
