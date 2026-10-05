"use client";

import { LocalizedLink, messages, useLocale } from "@/shared/i18n";
import { useNotFoundText, type NotFoundVariant } from "../text";
import styles from "./NotFound.module.css";

type NotFoundPanelProps = {
  // Which demo not-found.tsx rendered this, so the panel shows who answered.
  variant: NotFoundVariant;
};

export function NotFoundPanel({ variant }: NotFoundPanelProps) {
  const text = messages[useLocale()];
  const { title, source } = useNotFoundText().variants[variant];

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
