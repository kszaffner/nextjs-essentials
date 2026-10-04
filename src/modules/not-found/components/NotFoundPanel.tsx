import Link from "next/link";
import styles from "./NotFound.module.css";

type NotFoundPanelProps = {
  title: string;
  // Which not-found.tsx rendered this, so the demo shows who answered.
  source: string;
};

export function NotFoundPanel({ title, source }: NotFoundPanelProps) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.hint}>Rendered by {source}.</p>
      <p className={styles.hint}>
        <Link href="/">Back to all topics</Link>
      </p>
    </section>
  );
}
