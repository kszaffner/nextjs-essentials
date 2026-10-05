import { Suspense } from "react";
import { LocalizedLink, type Locale } from "@/shared/i18n";
import { PROXY_DEMO_BASE } from "../decideProxyAction";
import { getProxyText, type DestinationKind } from "../text";
import { DecisionReport } from "./DecisionReport";
import styles from "./Proxy.module.css";

type DemoDestinationProps = {
  locale: Locale;
  kind: DestinationKind;
};

export function DemoDestination({ locale, kind }: DemoDestinationProps) {
  const text = getProxyText(locale);
  const { title, description } = text.destinations[kind];

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.hint}>{description}</p>
      <Suspense fallback={<p className={styles.hint}>{text.report.reading}</p>}>
        <DecisionReport locale={locale} />
      </Suspense>
      <p className={styles.hint}>
        <LocalizedLink href={PROXY_DEMO_BASE}>{text.report.back}</LocalizedLink>
      </p>
    </section>
  );
}
