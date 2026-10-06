import { LocalizedLink, type Locale } from "@/shared/i18n";
import { getGenerateMetadataText } from "../text";
import styles from "./GenerateMetadata.module.css";

const base = "/metadata/generate-metadata/demo";

export function MetadataDemoNavigation({ locale }: { locale: Locale }) {
  const text = getGenerateMetadataText(locale).navigation;
  const links = [
    { href: `${base}/alpha`, label: text.alpha },
    { href: `${base}/preserved/alpha`, label: text.preserved },
    { href: `${base}/beta`, label: text.beta },
  ];

  return (
    <nav aria-label={text.label}>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            <LocalizedLink href={link.href}>{link.label}</LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
