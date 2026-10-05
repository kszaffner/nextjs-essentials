import type { Locale } from "@/shared/i18n";
import type { SignupFieldName, SignupState } from "../signupState";
import { getSignupText } from "../text";
import { FieldError } from "./FieldError";
import styles from "./Signup.module.css";

type FieldConfig = {
  name: SignupFieldName;
  type: "text" | "email" | "number";
  autoComplete: string;
};

const fields: readonly FieldConfig[] = [
  { name: "name", type: "text", autoComplete: "name" },
  { name: "email", type: "email", autoComplete: "email" },
  { name: "age", type: "number", autoComplete: "off" },
];

type SignupFieldsProps = {
  locale: Locale;
  state: SignupState;
};

export function SignupFields({ locale, state }: SignupFieldsProps) {
  const text = getSignupText(locale);
  const fieldErrors = state.status === "invalid" ? state.fieldErrors : {};
  const values = state.status === "invalid" ? state.values : undefined;

  return (
    <>
      {fields.map((field) => {
        const errorCode = fieldErrors[field.name];
        const message = errorCode ? text.errors[errorCode] : undefined;
        const errorId = `signup-${field.name}-error`;

        return (
          <label key={field.name} className={styles.field}>
            {text.fields[field.name]}
            <input
              className={styles.input}
              name={field.name}
              type={field.type}
              required
              autoComplete={field.autoComplete}
              // React resets uncontrolled fields after an action; refilling
              // from the returned values keeps what the user typed.
              defaultValue={values?.[field.name] ?? ""}
              aria-invalid={message ? true : undefined}
              aria-describedby={message ? errorId : undefined}
            />
            <FieldError id={errorId} message={message} />
          </label>
        );
      })}
      <label className={styles.field}>
        {text.fields.comment}
        <input className={styles.input} name="comment" type="text" maxLength={100} autoComplete="off" />
      </label>
    </>
  );
}
