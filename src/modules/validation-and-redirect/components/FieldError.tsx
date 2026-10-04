import styles from "./Signup.module.css";

type FieldErrorProps = {
  id: string;
  message: string | undefined;
};

export function FieldError({ id, message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <span id={id} className={styles.error} role="alert">
      {message}
    </span>
  );
}
