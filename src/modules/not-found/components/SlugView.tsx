import styles from "./NotFound.module.css";

type SlugViewProps = {
  slug: string;
};

export function SlugView({ slug }: SlugViewProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Item: {slug}</h3>
      <p className={styles.hint}>This slug exists, so the page rendered normally.</p>
    </section>
  );
}
