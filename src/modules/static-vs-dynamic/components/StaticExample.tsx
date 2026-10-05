import type { Locale } from "@/shared/i18n";
import { getStaticVsDynamicText } from "../text";
import styles from "./Rendering.module.css";

// Only predictable values: a literal and a pure computation. Both complete
// at build time, so the whole route is part of the static shell.
const KIBIBYTE = 2 ** 10;

export function StaticExample({ locale }: { locale: Locale }) {
  const text = getStaticVsDynamicText(locale).staticExample;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <ul className={styles.facts}>
        <li>{text.computation(KIBIBYTE)}</li>
        <li>{text.independent}</li>
      </ul>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
