import styles from "./Boundaries.module.css";
import { LocalizedLink } from "@/shared/i18n";

const base = "/errors/error-boundaries/demo";

const links = [
  { href: base, label: "Demo home" },
  { href: `${base}/page-crash`, label: "A page throws (its own error.tsx catches it)" },
  { href: `${base}/layout-crash`, label: "A layout throws (the segment's own error.tsx cannot catch it)" },
  { href: `${base}/event-handler`, label: "An event handler throws (no boundary involved)" },
] as const;

export function ErrorDemoNavigation() {
  return (
    <nav aria-label="Error boundaries demo">
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            {/* Prefetching would run the throwing routes before any click. */}
            <LocalizedLink href={link.href} prefetch={false}>
              {link.label}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
