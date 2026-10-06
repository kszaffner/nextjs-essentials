import { LocalizedLink, type Locale } from "@/shared/i18n";
import { ogDemoItems } from "../ogDemoData";
import { getOgImagesText } from "../text";
import styles from "./OgImages.module.css";

const base = "/metadata/og-images/demo";

export function OgDemoNavigation({ locale }: { locale: Locale }) {
  const text = getOgImagesText(locale).navigation;

  return (
    <nav aria-label={text.label}>
      <ul className={styles.links}>
        {ogDemoItems.map((item) => (
          <li key={item.slug}>
            <LocalizedLink href={`${base}/${item.slug}`}>
              {item.title}: {text.suffix}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
