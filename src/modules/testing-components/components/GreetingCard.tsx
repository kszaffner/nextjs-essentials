import type { Locale } from "@/shared/i18n";
import { getTestingComponentsText } from "../text";
import styles from "./Testing.module.css";

type GreetingCardProps = {
  locale: Locale;
  name: string;
  role: string;
};

// A synchronous, hook-free component: it is the same kind of thing whether it
// runs on the server or the client, so a plain render test covers it.
export function GreetingCard({ locale, name, role }: GreetingCardProps) {
  const text = getTestingComponentsText(locale).greeting;

  return (
    <section className={styles.panel}>
      <p className={styles.kind}>{text.kind}</p>
      <h3 className={styles.title}>{text.hello} {name}</h3>
      <p className={styles.hint}>{role}</p>
    </section>
  );
}
