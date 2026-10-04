import styles from "./NotFound.module.css";
import { LocalizedAnchor, LocalizedLink } from "@/shared/i18n";

const base = "/errors/not-found/demo";

const links = [
  { href: `${base}/alpha`, label: "alpha: exists" },
  { href: `${base}/nothing-here`, label: "nothing-here: notFound() before streaming" },
  { href: `${base}/streamed/alpha`, label: "streamed/alpha: exists" },
  { href: `${base}/streamed/nothing-here`, label: "streamed/nothing-here: notFound() while streaming" },
  { href: `${base}/no/such/route`, label: "no/such/route: matches no route at all" },
] as const;

export function NotFoundDemoNavigation() {
  return (
    <nav aria-label="Not found demo">
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            {/* Plain anchors: full requests, so the HTTP status is observable. */}
            <LocalizedAnchor href={link.href}>{link.label}</LocalizedAnchor>
          </li>
        ))}
      </ul>
      <p className={styles.hint}>
        Prefer <LocalizedLink href={base}>this page</LocalizedLink> for the reasoning, and curl -i
        to see the status codes.
      </p>
    </nav>
  );
}
