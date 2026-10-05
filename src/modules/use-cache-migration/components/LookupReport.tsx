import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getExecutionCount, getUserProfile } from "../server/userLookup";
import { getMigrationText } from "../text";
import styles from "./Migration.module.css";

// "1" is requested twice on purpose.
const REQUESTED_IDS = ["1", "2", "1"] as const;

export async function LookupReport({ locale }: { locale: Locale }) {
  await connection();
  const text = getMigrationText(locale);

  // Sequential, so the repeated id is a clean cache hit.
  const profiles = [];
  for (const id of REQUESTED_IDS) {
    profiles.push(await getUserProfile(id));
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>getUserProfile(id) {text.heading} &quot;use cache&quot;</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{text.columns.call}</th>
            <th scope="col">{text.columns.result}</th>
            <th scope="col">{text.columns.loadedAt}</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            // The id alone is not unique here: the same id is requested twice.
            <tr key={`${profile.id}-${index}`}>
              <th scope="row">getUserProfile(&quot;{profile.id}&quot;)</th>
              <td className={styles.code}>{profile.name}</td>
              <td className={styles.code}>{profile.loadedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.hint}>
        {text.executions} {getExecutionCount()}. {text.executionsHint}
      </p>
    </section>
  );
}
