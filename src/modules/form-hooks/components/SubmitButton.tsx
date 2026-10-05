"use client";

import { useFormStatus } from "react-dom";
import type { Locale } from "@/shared/i18n";
import { getFormHooksText } from "../text";
import styles from "./FormHooks.module.css";

// useFormStatus reports the status of the closest parent <form>, so it only
// works in a component rendered *inside* the form, never in the form's owner.
export function SubmitButton({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();
  const text = getFormHooksText(locale).submit;

  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? text.pending : text.idle}
    </button>
  );
}
