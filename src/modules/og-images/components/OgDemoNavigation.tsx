import { ogDemoItems } from "../ogDemoData";
import styles from "./OgImages.module.css";
import { LocalizedLink } from "@/shared/i18n";

const base = "/metadata/og-images/demo";

export function OgDemoNavigation() {
  return (
    <nav aria-label="Open Graph demo">
      <ul className={styles.links}>
        {ogDemoItems.map((item) => (
          <li key={item.slug}>
            <LocalizedLink href={`${base}/${item.slug}`}>{item.title}: a page with its own generated image</LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
