import type { Locale } from "@/shared/i18n";
import { revalidateCatalog } from "../server/actions";
import { getCatalogSnapshot } from "../server/catalogSnapshot";
import { getIsrText } from "../text";
import styles from "./Isr.module.css";

// Prerendered at build time like any static page. The cached snapshot is then
// regenerated in the background, on a timer or on demand.
export async function IsrDemo({ locale }: { locale: Locale }) {
  const snapshot = await getCatalogSnapshot();
  const text = getIsrText(locale);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.readout}>{text.generatedAt}: {snapshot.generatedAt}</p>
      <p className={styles.hint}>{text.hint}</p>
      <form action={revalidateCatalog}>
        <button type="submit" className={styles.button}>
          {text.button}
        </button>
      </form>
    </section>
  );
}
