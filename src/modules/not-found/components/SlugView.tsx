import type { Locale } from "@/shared/i18n";
import { getNotFoundText } from "../text";
import styles from "./NotFound.module.css";

type SlugViewProps = {
  locale: Locale;
  slug: string;
};

export function SlugView({ locale, slug }: SlugViewProps) {
  const text = getNotFoundText(locale).slug;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title} {slug}</h3>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
