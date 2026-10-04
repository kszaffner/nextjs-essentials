import { Suspense } from "react";
import { RuntimeProbe } from "./RuntimeProbe";
import { RuntimeTable } from "./RuntimeTable";
import { ServerRenderRow } from "./ServerRenderRow";
import styles from "./Runtimes.module.css";

export function RuntimesDemo() {
  return (
    <div>
      <section className={styles.panel}>
        <h3 className={styles.title}>Server render</h3>
        <RuntimeTable>
          <Suspense
            fallback={
              <tr>
                <td colSpan={3}>Reading the runtime…</td>
              </tr>
            }
          >
            <ServerRenderRow />
          </Suspense>
        </RuntimeTable>
      </section>
      <RuntimeProbe />
    </div>
  );
}
