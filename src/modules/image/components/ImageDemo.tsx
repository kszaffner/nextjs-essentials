import Image from "next/image";
import { ImageReport } from "./ImageReport";
import styles from "./ImageDemo.module.css";

const galleryPhotos = [
  { src: "/demo/photo-1.jpg", alt: "Gallery photo one" },
  { src: "/demo/photo-2.jpg", alt: "Gallery photo two" },
  { src: "/demo/photo-3.jpg", alt: "Gallery photo three" },
] as const;

function HeroSection() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>1. The hero (the LCP element)</h3>
      <Image
        src="/demo/hero.jpg"
        alt="A wavy colour field used as the hero image"
        width={1600}
        height={900}
        sizes="(min-width: 60rem) 40rem, 100vw"
        className={styles.responsive}
        // The one image that is certainly the largest paint: fetched early.
        preload
      />
      <p className={styles.hint}>
        width and height reserve the space, so nothing shifts when it loads;
        sizes tells the browser how wide it will be, so it picks a srcset
        candidate; preload adds a link in the head.
      </p>
    </section>
  );
}

function GallerySection() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>2. A gallery, lazy by default</h3>
      <div className={styles.gallery}>
        {galleryPhotos.map((photo) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
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

function FillSection() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>3. fill inside a sized box</h3>
      <div className={styles.fillBox}>
        <Image
          src="/demo/photo-2.jpg"
          alt="A photo cropped to fill its box"
          fill
          sizes="(min-width: 60rem) 24rem, 100vw"
          className={styles.cover}
        />
      </div>
    </section>
  );
}

export function ImageDemo() {
  return (
    <div>
      <HeroSection />
      <div className={styles.spacer}>Scroll a long way down: the gallery is far below the fold</div>
      <GallerySection />
      <FillSection />
      <ImageReport />
    </div>
  );
}
