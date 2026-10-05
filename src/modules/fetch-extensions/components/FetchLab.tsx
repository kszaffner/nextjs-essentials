import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { revalidateFetchDemo } from "../server/actions";
import { FETCH_DEMO_TAG, loadClockReadings } from "../server/clockClient";
import { getSiteOrigin } from "../server/env";
import { getFetchExtensionsText } from "../text";
import { ReadingsTable } from "./ReadingsTable";
import styles from "./FetchLab.module.css";

// connection() first: these fetches need the running server (they call this
// app's own API), so they must happen at request time, not during the build.
export async function FetchLab({ locale }: { locale: Locale }) {
  await connection();
  const text = getFetchExtensionsText(locale);
  const origin = getSiteOrigin();

  if (!origin) {
    return (
      <p role="status">{text.originMissing}</p>
    );
  }

  const { variantReadings, memoizedPair } = await loadClockReadings(origin);

  return (
    <div className={styles.panel}>
      <ReadingsTable locale={locale} variantReadings={variantReadings} memoizedPair={memoizedPair} />
      <p className={styles.hint}>{text.hint}</p>
      <form action={revalidateFetchDemo}>
        <button type="submit" className={styles.button}>
          revalidateTag(&quot;{FETCH_DEMO_TAG}&quot;)
        </button>
      </form>
    </div>
  );
}
