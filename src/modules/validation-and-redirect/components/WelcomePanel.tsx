import { LocalizedLink, type Locale } from "@/shared/i18n";
import { getSignupText } from "../text";
import styles from "./Signup.module.css";

type WelcomePanelProps = {
  locale: Locale;
  name: string;
};

export function WelcomePanel({ locale, name }: WelcomePanelProps) {
  const text = getSignupText(locale).welcome;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title} {name}</h3>
      <p className={styles.hint}>
        {text.body}{" "}
        <LocalizedLink href="/server-actions/validation-and-redirect/demo">{text.back}</LocalizedLink>
      </p>
    </section>
  );
}
