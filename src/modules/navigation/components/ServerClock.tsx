import { connection } from "next/server";
import styles from "./Navigation.module.css";

// Rendered per request, so router.refresh() visibly re-runs it while the
// client state of the playground above survives.
export async function ServerClock() {
  await connection();
  const renderedAt = new Date().toISOString();

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Server Component</h3>
      <p className={styles.readout}>Rendered on the server at {renderedAt}</p>
      <p className={styles.hint}>
        router.refresh() re-renders this on the server without losing the
        client state above.
      </p>
    </section>
  );
}
