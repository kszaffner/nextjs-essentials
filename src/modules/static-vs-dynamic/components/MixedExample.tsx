import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getStaticVsDynamicText } from "../text";
import { DynamicPart } from "./DynamicPart";
import styles from "./Rendering.module.css";

export function MixedExample({ locale }: { locale: Locale }) {
  const text = getStaticVsDynamicText(locale).mixedExample;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <p>{text.shell}</p>
      <Suspense fallback={<p className={styles.hint}>{text.loading}</p>}>
        <DynamicPart locale={locale} />
      </Suspense>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
