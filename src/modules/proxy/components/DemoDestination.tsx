import { Suspense } from "react";
import { PROXY_DEMO_BASE } from "../decideProxyAction";
import { DecisionReport } from "./DecisionReport";
import styles from "./Proxy.module.css";
import { LocalizedLink } from "@/shared/i18n";

type DemoDestinationProps = {
  title: string;
  description: string;
};

export function DemoDestination({ title, description }: DemoDestinationProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.hint}>{description}</p>
      <Suspense fallback={<p className={styles.hint}>Reading the proxy decision…</p>}>
        <DecisionReport />
      </Suspense>
      <p className={styles.hint}>
        <LocalizedLink href={PROXY_DEMO_BASE}>Back to the proxy demo</LocalizedLink>
      </p>
    </section>
  );
}
