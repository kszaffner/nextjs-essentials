import type { ReactNode } from "react";
import { messages, type Locale } from "@/shared/i18n";
import styles from "./UnderTheHood.module.css";

type UnderTheHoodProps = {
  locale: Locale;
  children: ReactNode;
};

// Collapsed by default so it never hides the demo above it. What goes inside
// is evidence: live measurements and the real files behind the demo.
export function UnderTheHood({ locale, children }: UnderTheHoodProps) {
  const text = messages[locale].underTheHood;

  return (
    <details className={styles.panel}>
      <summary className={styles.summary}>{text.title}</summary>
      <p className={styles.lead}>{text.lead}</p>
      <div className={styles.body}>{children}</div>
    </details>
  );
}

type PartProps = {
  title: string;
  children: ReactNode;
};

// One labelled block inside the panel.
export function UnderTheHoodPart({ title, children }: PartProps) {
  return (
    <section className={styles.part}>
      <h4 className={styles.partTitle}>{title}</h4>
      {children}
    </section>
  );
}
