import { HeadInspector } from "./HeadInspector";
import styles from "./GenerateMetadata.module.css";

type ArticleViewProps = {
  title: string;
  summary: string;
  variant: "lossy" | "preserved";
};

export function ArticleView({ title, summary, variant }: ArticleViewProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.hint}>{summary}</p>
      <p className={styles.hint}>
        {variant === "lossy"
          ? "This route's generateMetadata returns its own openGraph object, which replaces the layout's."
          : "This route builds on the parent's openGraph through the parent argument."}
      </p>
      <HeadInspector />
    </section>
  );
}
