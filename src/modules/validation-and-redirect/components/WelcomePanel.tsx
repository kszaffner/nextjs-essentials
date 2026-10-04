import Link from "next/link";
import styles from "./Signup.module.css";

type WelcomePanelProps = {
  name: string;
};

export function WelcomePanel({ name }: WelcomePanelProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Welcome, {name}</h3>
      <p className={styles.hint}>
        You arrived here through a redirect() in the Server Action.{" "}
        <Link href="/server-actions/validation-and-redirect/demo">Back to the form</Link>
      </p>
    </section>
  );
}
