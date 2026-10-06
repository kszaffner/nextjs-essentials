import Image from "next/image";
import type { Locale } from "@/shared/i18n";
import { getImageText } from "../text";
import { ImageReport } from "./ImageReport";
import styles from "./ImageDemo.module.css";

const galleryPhotoSources = ["/demo/photo-1.jpg", "/demo/photo-2.jpg", "/demo/photo-3.jpg"] as const;

function HeroSection({ locale }: { locale: Locale }) {
  const text = getImageText(locale).hero;

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{text.title}</h3>
      <Image
        src="/demo/hero.jpg"
        alt={text.alt}
        width={1600}
        height={900}
        sizes="(min-width: 60rem) 40rem, 100vw"
        className={styles.responsive}
        // The one image that is certainly the largest paint: fetched early.
        preload
      />
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}

function GallerySection({ locale }: { locale: Locale }) {
  const text = getImageText(locale).gallery;

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{text.title}</h3>
      <div className={styles.gallery}>
        {galleryPhotoSources.map((source, index) => (
          <Image
            key={source}
            src={source}
            alt={text.alts[index] ?? ""}
            width={1200}
            height={800}
            sizes="(min-width: 60rem) 12rem, 33vw"
            className={styles.responsive}
          />
        ))}
      </div>
    </section>
  );
}

function FillSection({ locale }: { locale: Locale }) {
  const text = getImageText(locale).fill;

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{text.title}</h3>
      <div className={styles.fillBox}>
        <Image
          src="/demo/photo-2.jpg"
          alt={text.alt}
          fill
          sizes="(min-width: 60rem) 24rem, 100vw"
          className={styles.cover}
        />
      </div>
    </section>
  );
}

export function ImageDemo({ locale }: { locale: Locale }) {
  return (
    <div>
      <HeroSection locale={locale} />
      <div className={styles.spacer}>{getImageText(locale).spacer}</div>
      <GallerySection locale={locale} />
      <FillSection locale={locale} />
      <ImageReport />
    </div>
  );
}
