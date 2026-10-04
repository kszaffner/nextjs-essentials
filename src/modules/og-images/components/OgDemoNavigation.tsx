import Link from "next/link";
import { ogDemoItems } from "../ogDemoData";
import styles from "./OgImages.module.css";

const base = "/metadata/og-images/demo";

export function OgDemoNavigation() {
  return (
    <nav aria-label="Open Graph demo">
      <ul className={styles.links}>
        {ogDemoItems.map((item) => (
          <li key={item.slug}>
            <Link href={`${base}/${item.slug}`}>{item.title}: a page with its own generated image</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
