import { OgInspector } from "./OgInspector";
import styles from "./OgImages.module.css";

type OgItemViewProps = {
  title: string;
};

export function OgItemView({ title }: OgItemViewProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.hint}>
        This segment has its own opengraph-image.tsx, so its og:image points at
        an image generated for this slug instead of the site-wide one.
      </p>
      <OgInspector />
    </section>
  );
}
