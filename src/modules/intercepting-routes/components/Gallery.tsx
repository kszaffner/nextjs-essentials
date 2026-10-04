import { LocalizedLink, type Locale } from "@/shared/i18n";
import { photos } from "../photos";
import { getInterceptingText } from "../text";
import styles from "./Gallery.module.css";

export function Gallery({ locale }: { locale: Locale }) {
  const text = getInterceptingText(locale).gallery;

  return (
    <section>
      <h3>{text.title}</h3>
      <ul className={styles.grid}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <LocalizedLink
              href={`/fundamentals/intercepting-routes/demo/photo/${photo.id}`}
              className={styles.thumbnail}
            >
              <div className={styles.swatch} style={{ background: photo.color }} />
              {photo.titles[locale]}
            </LocalizedLink>
          </li>
        ))}
      </ul>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
