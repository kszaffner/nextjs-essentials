import styles from "./GenerateMetadata.module.css";
import { LocalizedLink } from "@/shared/i18n";

const base = "/metadata/generate-metadata/demo";

const links = [
  { href: `${base}/alpha`, label: "alpha: generateMetadata replaces openGraph" },
  { href: `${base}/preserved/alpha`, label: "preserved/alpha: builds on the parent's openGraph" },
  { href: `${base}/beta`, label: "beta: same route, different data" },
] as const;

export function MetadataDemoNavigation() {
  return (
    <nav aria-label="generateMetadata demo">
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
