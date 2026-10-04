"use client";

import { LocalizedLink, messages, useLocale } from "@/shared/i18n";
import styles from "./NotFound.module.css";

type NotFoundPanelProps = {
  // Defaults to the localized "Page not found".
  title?: string;
  // Which not-found.tsx rendered this, so the demo shows who answered.
  source: string;
};

export function NotFoundPanel({ title, source }: NotFoundPanelProps) {
  const text = messages[useLocale()];

  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>{title ?? text.notFound.title}</h2>
      <p className={styles.hint}>{text.notFound.renderedBy(source)}</p>
      <p className={styles.hint}>
        <LocalizedLink href="/">{text.backToTopics}</LocalizedLink>
      </p>
    </section>
  );
}
