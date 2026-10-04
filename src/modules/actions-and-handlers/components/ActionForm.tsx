"use client";

import { useActionState } from "react";
import { initialRiskyActionState, type RiskyActionState } from "../actionState";
import { reserveAction } from "../server/actions";
import styles from "./Handling.module.css";

function describe(state: RiskyActionState): string {
  switch (state.status) {
    case "idle":
      return "No result yet.";
    case "reserved":
      return `Reserved: ${state.reservation}`;
    case "refused":
      return `Refused: ${state.message}`;
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

const actionModes = ["ok", "expected", "unexpected"] as const;

export function ActionForm() {
  const [state, formAction, isPending] = useActionState(reserveAction, initialRiskyActionState);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Server Action</h3>
      <form action={formAction}>
        <fieldset className={styles.choices}>
          <legend>Outcome to simulate</legend>
          {actionModes.map((mode) => (
            <label key={mode}>
              <input type="radio" name="mode" value={mode} defaultChecked={mode === "ok"} /> {mode}
            </label>
          ))}
        </fieldset>
        <div className={styles.buttons}>
          <button type="submit" className={styles.button} disabled={isPending}>
            Run the action
          </button>
        </div>
      </form>
      <p className={styles.result} role="status">
        {describe(state)}
      </p>
      <p className={styles.hint}>
        &quot;unexpected&quot; throws: the error boundary of this demo replaces
        the page with a safe message.
      </p>
    </section>
  );
}
