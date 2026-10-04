"use client";

import { useActionState } from "react";
import { initialSignupState } from "../signupState";
import { signUp } from "../server/actions";
import { SignupFields } from "./SignupFields";
import styles from "./Signup.module.css";

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialSignupState);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Sign up</h3>
      <form action={formAction}>
        <SignupFields state={state} />
        <div className={styles.buttons}>
          <button type="submit" className={styles.button} disabled={isPending}>
            Sign up
          </button>
          {/* Skips the browser's own checks so the server's rules are visible. */}
          <button type="submit" className={styles.button} disabled={isPending} formNoValidate>
            Sign up (skip browser validation)
          </button>
        </div>
      </form>
      <p className={styles.hint}>
        Browser validation is a convenience. The server validates every field
        itself and, when all pass, redirects.
      </p>
    </section>
  );
}
