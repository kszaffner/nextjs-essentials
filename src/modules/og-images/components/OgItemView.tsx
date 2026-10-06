import type { Locale } from "@/shared/i18n";
import { getOgImagesText } from "../text";
import { OgInspector } from "./OgInspector";
import styles from "./OgImages.module.css";

type OgItemViewProps = {
  locale: Locale;
  title: string;
};

export function OgItemView({ locale, title }: OgItemViewProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.hint}>{getOgImagesText(locale).item.hint}</p>
      <OgInspector locale={locale} />
    </section>
  );
}
