import { getCachedEntries } from "../server/cachedEntries";
import styles from "./Revalidation.module.css";

export async function EntryList() {
  const { entries, cachedAt } = await getCachedEntries();

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Cached list</h3>
      {entries.length === 0 ? (
        <p className={styles.readout}>(empty)</p>
      ) : (
        <ul className={styles.entries}>
          {entries.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      )}
      <p className={styles.readout}>cached at {cachedAt}</p>
    </section>
  );
}
