import type { Locale } from "@/shared/i18n";
import { getCachedEntries } from "../server/cachedEntries";
import { getRevalidationText } from "../text";
import styles from "./Revalidation.module.css";

export async function EntryList({ locale }: { locale: Locale }) {
  const text = getRevalidationText(locale).list;
  const { entries, cachedAt } = await getCachedEntries();

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      {entries.length === 0 ? (
        <p className={styles.readout}>{text.empty}</p>
      ) : (
        <ul className={styles.entries}>
          {entries.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      )}
      <p className={styles.readout}>{text.cachedAt} {cachedAt}</p>
    </section>
  );
}
