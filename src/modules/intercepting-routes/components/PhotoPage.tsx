import type { Photo } from "../photos";
import { PhotoView } from "./PhotoView";
import styles from "./Gallery.module.css";

type PhotoPageProps = {
  photo: Photo;
};

export function PhotoPage({ photo }: PhotoPageProps) {
  return (
    <article>
      <h3>{photo.title}</h3>
      <PhotoView photo={photo} />
      <p className={styles.hint}>
        This is the full photo page (demo/photo/[id]/page.tsx), rendered
        because the URL was opened directly or the page was reloaded.
      </p>
    </article>
  );
}
