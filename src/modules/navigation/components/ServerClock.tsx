import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getNavigationText } from "../text";
import styles from "./Navigation.module.css";

// Rendered per request, so router.refresh() visibly re-runs it while the
// client state of the playground above survives.
export async function ServerClock({ locale }: { locale: Locale }) {
  await connection();
  const renderedAt = new Date().toISOString();
  const text = getNavigationText(locale).serverClock;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.readout}>
        {text.renderedAt} {renderedAt}
      </p>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
