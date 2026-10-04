import type { SignupFieldName, SignupState } from "../signupState";
import { FieldError } from "./FieldError";
import styles from "./Signup.module.css";

type FieldConfig = {
  name: SignupFieldName;
  label: string;
  type: "text" | "email" | "number";
  autoComplete: string;
};

const fields: readonly FieldConfig[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "age", label: "Age", type: "number", autoComplete: "off" },
];

type SignupFieldsProps = {
  state: SignupState;
};

export function SignupFields({ state }: SignupFieldsProps) {
  const fieldErrors = state.status === "invalid" ? state.fieldErrors : {};
  const values = state.status === "invalid" ? state.values : undefined;

  return (
    <>
      {fields.map((field) => {
        const message = fieldErrors[field.name];
        const errorId = `signup-${field.name}-error`;

        return (
          <label key={field.name} className={styles.field}>
            {field.label}
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
        Comment (optional, deliberately not refilled)
        <input className={styles.input} name="comment" type="text" maxLength={100} autoComplete="off" />
      </label>
    </>
  );
}
