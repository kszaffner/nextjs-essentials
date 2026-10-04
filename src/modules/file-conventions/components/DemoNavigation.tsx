"use client";

import { LocalizedLink } from "@/shared/i18n";
import { useFileConventionsText } from "../text";
import styles from "./Demo.module.css";

const demoBase = "/fundamentals/file-conventions/demo";

export function DemoNavigation() {
  const text = useFileConventionsText();
  const demoLinks = [
    { href: demoBase, label: text.links.home },
    { href: `${demoBase}/second`, label: text.links.second },
    { href: `${demoBase}/slow`, label: text.links.slow },
    { href: `${demoBase}/crash`, label: text.links.crash },
    { href: `${demoBase}/missing`, label: text.links.missing },
    { href: `${demoBase}/about`, label: text.links.about },
    // The _private link is a deliberate 404; prefetching it would only log errors.
    { href: `${demoBase}/_private`, label: text.links.privateFolder, shouldPrefetch: false },
  ];

  return (
    <nav aria-label={text.navigationLabel}>
      <ul className={styles.links}>
        {demoLinks.map((link) => (
          <li key={link.href}>
            <LocalizedLink href={link.href} prefetch={link.shouldPrefetch}>
              {link.label}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
