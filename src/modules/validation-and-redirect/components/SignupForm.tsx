"use client";

import { useActionState } from "react";
import type { Locale } from "@/shared/i18n";
import { initialSignupState } from "../signupState";
import { signUp } from "../server/actions";
import { getSignupText } from "../text";
import { SignupFields } from "./SignupFields";
import styles from "./Signup.module.css";

export function SignupForm({ locale }: { locale: Locale }) {
  const text = getSignupText(locale).form;
  const [state, formAction, isPending] = useActionState(signUp, initialSignupState);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <form action={formAction}>
        <SignupFields locale={locale} state={state} />
        <div className={styles.buttons}>
          <button type="submit" className={styles.button} disabled={isPending}>
            {text.submit}
          </button>
          {/* Skips the browser's own checks so the server's rules are visible. */}
          <button type="submit" className={styles.button} disabled={isPending} formNoValidate>
            {text.submitSkippingBrowser}
          </button>
        </div>
      </form>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
