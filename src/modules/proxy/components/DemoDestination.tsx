import { Suspense } from "react";
import Link from "next/link";
import { PROXY_DEMO_BASE } from "../decideProxyAction";
import { DecisionReport } from "./DecisionReport";
import styles from "./Proxy.module.css";

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
        <Link href={PROXY_DEMO_BASE}>Back to the proxy demo</Link>
      </p>
    </section>
  );
}
