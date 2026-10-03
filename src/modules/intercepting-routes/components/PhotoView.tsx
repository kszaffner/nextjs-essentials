import type { Photo } from "../photos";
import styles from "./Gallery.module.css";

type PhotoViewProps = {
  photo: Photo;
};

export function PhotoView({ photo }: PhotoViewProps) {
  return (
    <div>
      <div className={styles.large} style={{ background: photo.color }} role="img" aria-label={photo.title} />
    </div>
  );
}
