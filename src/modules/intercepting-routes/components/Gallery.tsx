import { photos } from "../photos";
import styles from "./Gallery.module.css";
import { LocalizedLink } from "@/shared/i18n";

export function Gallery() {
  return (
    <section>
      <h3>Gallery</h3>
      <ul className={styles.grid}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <LocalizedLink
              href={`/fundamentals/intercepting-routes/demo/photo/${photo.id}`}
              className={styles.thumbnail}
            >
              <div className={styles.swatch} style={{ background: photo.color }} />
              {photo.title}
            </LocalizedLink>
          </li>
        ))}
      </ul>
      <p className={styles.hint}>
        Clicking a photo opens it in a modal over this page. Opening the same
        URL in a new tab, or reloading with the modal open, shows the full
        photo page instead.
      </p>
    </section>
  );
}
