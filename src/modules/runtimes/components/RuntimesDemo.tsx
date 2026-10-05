import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getRuntimesText } from "../text";
import { RuntimeProbe } from "./RuntimeProbe";
import { RuntimeTable } from "./RuntimeTable";
import { ServerRenderRow } from "./ServerRenderRow";
import styles from "./Runtimes.module.css";

export function RuntimesDemo({ locale }: { locale: Locale }) {
  const text = getRuntimesText(locale);

  return (
    <div>
      <section className={styles.panel}>
        <h3 className={styles.title}>{text.serverRender.title}</h3>
        <RuntimeTable locale={locale}>
          <Suspense
            fallback={
              <tr>
                <td colSpan={3}>{text.serverRender.reading}</td>
              </tr>
            }
          >
            <ServerRenderRow locale={locale} />
          </Suspense>
        </RuntimeTable>
      </section>
      <RuntimeProbe locale={locale} />
    </div>
  );
}
