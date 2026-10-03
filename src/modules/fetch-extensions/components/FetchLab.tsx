import { connection } from "next/server";
import { revalidateFetchDemo } from "../server/actions";
import { FETCH_DEMO_TAG, loadClockReadings } from "../server/clockClient";
import { getSiteOrigin } from "../server/env";
import { ReadingsTable } from "./ReadingsTable";
import styles from "./FetchLab.module.css";

// connection() first: these fetches need the running server (they call this
// app's own API), so they must happen at request time, not during the build.
export async function FetchLab() {
  await connection();
  const origin = getSiteOrigin();

  if (!origin) {
    return (
      <p role="status">
        This demo calls the app&apos;s own API. Set SITE_ORIGIN to this
        site&apos;s URL to enable it.
      </p>
    );
  }

  const { variantReadings, memoizedPair } = await loadClockReadings(origin);

  return (
    <div className={styles.panel}>
      <ReadingsTable variantReadings={variantReadings} memoizedPair={memoizedPair} />
      <p className={styles.hint}>
        Reload: rows whose &quot;API hits&quot; keep growing hit the API every
        time; rows that stay put are served from the cache.
      </p>
      <form action={revalidateFetchDemo}>
        <button type="submit" className={styles.button}>
          revalidateTag(&quot;{FETCH_DEMO_TAG}&quot;)
        </button>
      </form>
    </div>
  );
}
