import { refresh } from "next/cache";
import type { Locale } from "@/shared/i18n";
import { incrementCount } from "../server/counterStore";
import { getServerActionsBasicsText } from "../text";
import styles from "./Actions.module.css";

// Declared inside a Server Component: "use server" marks the function as a
// Server Action, and it can capture values from the render (encrypted when
// sent to the client).
export function InlineActionForm({ locale }: { locale: Locale }) {
  const text = getServerActionsBasicsText(locale).inline;

  async function incrementFromServerComponent() {
    "use server";
    await incrementCount();
    refresh();
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <form action={incrementFromServerComponent}>
        <button type="submit" className={styles.button}>
          {text.button}
        </button>
      </form>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
