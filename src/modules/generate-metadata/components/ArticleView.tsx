import type { Locale } from "@/shared/i18n";
import { getGenerateMetadataText } from "../text";
import { HeadInspector } from "./HeadInspector";
import styles from "./GenerateMetadata.module.css";

type ArticleViewProps = {
  locale: Locale;
  title: string;
  summary: string;
  variant: "lossy" | "preserved";
};

export function ArticleView({ locale, title, summary, variant }: ArticleViewProps) {
  const text = getGenerateMetadataText(locale);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.hint}>{summary}</p>
      <p className={styles.hint}>{text.article[variant]}</p>
      <HeadInspector locale={locale} />
    </section>
  );
}
