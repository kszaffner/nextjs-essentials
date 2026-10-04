import type { Locale } from "@/shared/i18n";
import type { Photo } from "../photos";
import { getInterceptingText } from "../text";
import { PhotoView } from "./PhotoView";
import styles from "./Gallery.module.css";

type PhotoPageProps = {
  photo: Photo;
  locale: Locale;
};

export function PhotoPage({ photo, locale }: PhotoPageProps) {
  const title = photo.titles[locale];

  return (
    <article>
      <h3>{title}</h3>
      <PhotoView color={photo.color} title={title} />
      <p className={styles.hint}>{getInterceptingText(locale).photoPage(title)}</p>
    </article>
  );
}
