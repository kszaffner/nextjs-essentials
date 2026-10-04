import styles from "./Signup.module.css";
import { LocalizedLink } from "@/shared/i18n";

type WelcomePanelProps = {
  name: string;
};

export function WelcomePanel({ name }: WelcomePanelProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Welcome, {name}</h3>
      <p className={styles.hint}>
        You arrived here through a redirect() in the Server Action.{" "}
        <LocalizedLink href="/server-actions/validation-and-redirect/demo">Back to the form</LocalizedLink>
      </p>
    </section>
  );
}
