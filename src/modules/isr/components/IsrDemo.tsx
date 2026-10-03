import { revalidateCatalog } from "../server/actions";
import { getCatalogSnapshot } from "../server/catalogSnapshot";
import styles from "./Isr.module.css";

// Prerendered at build time like any static page. The cached snapshot is then
// regenerated in the background, on a timer or on demand.
export async function IsrDemo() {
  const snapshot = await getCatalogSnapshot();

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Cached catalog snapshot</h3>
      <p className={styles.readout}>generated at: {snapshot.generatedAt}</p>
      <p className={styles.hint}>
        Reload more than 10 seconds after that time: you still see this value
        once while a new one is generated, and the next reload shows it.
      </p>
      <form action={revalidateCatalog}>
        <button type="submit" className={styles.button}>
          Revalidate now (on demand)
        </button>
      </form>
    </section>
  );
}
