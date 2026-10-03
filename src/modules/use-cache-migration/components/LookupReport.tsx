import { connection } from "next/server";
import { getExecutionCount, getUserProfile } from "../server/userLookup";
import styles from "./Migration.module.css";

// "1" is requested twice on purpose.
const REQUESTED_IDS = ["1", "2", "1"] as const;

export async function LookupReport() {
  await connection();

  // Sequential, so the repeated id is a clean cache hit.
  const profiles = [];
  for (const id of REQUESTED_IDS) {
    profiles.push(await getUserProfile(id));
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>getUserProfile(id) with &quot;use cache&quot;</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Call</th>
            <th scope="col">Result</th>
            <th scope="col">Loaded at</th>
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
        Function bodies executed in this server process: {getExecutionCount()}.
        Three calls, two distinct ids: at most two executions, and reloading
        does not add any.
      </p>
    </section>
  );
}
