import { LocalizedLink, type Locale } from "@/shared/i18n";
import { getErrorBoundariesText } from "../text";
import styles from "./Boundaries.module.css";

const base = "/errors/error-boundaries/demo";

export function ErrorDemoNavigation({ locale }: { locale: Locale }) {
  const text = getErrorBoundariesText(locale).navigation;
  const links = [
    { href: base, label: text.home },
    { href: `${base}/page-crash`, label: text.page },
    { href: `${base}/layout-crash`, label: text.layout },
    { href: `${base}/event-handler`, label: text.handler },
  ];

  return (
    <nav aria-label={text.label}>
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
