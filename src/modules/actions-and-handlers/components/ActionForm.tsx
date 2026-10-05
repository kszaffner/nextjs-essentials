"use client";

import { useActionState } from "react";
import type { Locale } from "@/shared/i18n";
import { initialRiskyActionState, type RiskyActionState } from "../actionState";
import { reserveAction } from "../server/actions";
import { getHandlingText, type HandlingText } from "../text";
import styles from "./Handling.module.css";

function describe(state: RiskyActionState, text: HandlingText["action"]): string {
  switch (state.status) {
    case "idle":
      return text.idle;
    case "reserved":
      return text.reserved(state.reservation);
    case "refused":
      return text.refused(text.refusals[state.code]);
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

const actionModes = ["ok", "expected", "unexpected"] as const;

export function ActionForm({ locale }: { locale: Locale }) {
  const text = getHandlingText(locale).action;
  const [state, formAction, isPending] = useActionState(reserveAction, initialRiskyActionState);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <form action={formAction}>
        <fieldset className={styles.choices}>
          <legend>{text.legend}</legend>
          {actionModes.map((mode) => (
            <label key={mode}>
              <input type="radio" name="mode" value={mode} defaultChecked={mode === "ok"} /> {mode}
            </label>
          ))}
        </fieldset>
        <div className={styles.buttons}>
          <button type="submit" className={styles.button} disabled={isPending}>
            {text.run}
          </button>
        </div>
      </form>
      <p className={styles.result} role="status">
        {describe(state, text)}
      </p>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
