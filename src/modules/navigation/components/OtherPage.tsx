"use client";

import { LocalizedLink } from "@/shared/i18n";
import { useNavigationText } from "../text";
import styles from "./Navigation.module.css";

export function OtherPage() {
  const text = useNavigationText().other;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.hint}>
        {text.arrived} <LocalizedLink href="/fundamentals/navigation/demo">{text.back}</LocalizedLink>
      </p>
    </section>
  );
}
