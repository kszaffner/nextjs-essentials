import { LocalizedAnchor, LocalizedLink, type Locale } from "@/shared/i18n";
import { getNotFoundText } from "../text";
import styles from "./NotFound.module.css";

const base = "/errors/not-found/demo";

export function NotFoundDemoNavigation({ locale }: { locale: Locale }) {
  const text = getNotFoundText(locale).navigation;
  const links = [
    { href: `${base}/alpha`, label: text.alpha },
    { href: `${base}/nothing-here`, label: text.missing },
    { href: `${base}/streamed/alpha`, label: text.streamedAlpha },
    { href: `${base}/streamed/nothing-here`, label: text.streamedMissing },
    { href: `${base}/no/such/route`, label: text.noRoute },
  ];

  return (
    <nav aria-label={text.label}>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            {/* Plain anchors: full requests, so the HTTP status is observable. */}
            <LocalizedAnchor href={link.href}>{link.label}</LocalizedAnchor>
          </li>
        ))}
      </ul>
      <p className={styles.hint}>
        {text.hintBefore} <LocalizedLink href={base}>{text.hintLink}</LocalizedLink> {text.hintAfter}
      </p>
    </nav>
  );
}
