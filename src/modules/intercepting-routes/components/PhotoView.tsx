import styles from "./Gallery.module.css";

type PhotoViewProps = {
  color: string;
  title: string;
};

export function PhotoView({ color, title }: PhotoViewProps) {
  return (
    <div>
      <div className={styles.large} style={{ background: color }} role="img" aria-label={title} />
    </div>
  );
}
