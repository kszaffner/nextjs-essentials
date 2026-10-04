"use client";

import { useFormStatus } from "react-dom";
import styles from "./FormHooks.module.css";

// useFormStatus reports the status of the closest parent <form>, so it only
// works in a component rendered *inside* the form, never in the form's owner.
export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? "Posting…" : "Post message"}
    </button>
  );
}
