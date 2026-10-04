import styles from "./Demo.module.css";
import { LocalizedLink } from "@/shared/i18n";

type DemoLink = {
  href: string;
  label: string;
  // The _private link is a deliberate 404; prefetching it would only log errors.
  shouldPrefetch?: boolean;
};

const demoLinks: readonly DemoLink[] = [
  { href: "/fundamentals/file-conventions/demo", label: "Demo home" },
  { href: "/fundamentals/file-conventions/demo/second", label: "Second page" },
  { href: "/fundamentals/file-conventions/demo/slow", label: "Slow page (loading.tsx)" },
  { href: "/fundamentals/file-conventions/demo/crash", label: "Crash page (error.tsx)" },
  { href: "/fundamentals/file-conventions/demo/missing", label: "Missing page (not-found.tsx)" },
  { href: "/fundamentals/file-conventions/demo/about", label: "About (route group)" },
  { href: "/fundamentals/file-conventions/demo/_private", label: "_private folder (404)", shouldPrefetch: false },
];

export function DemoNavigation() {
  return (
    <nav aria-label="File conventions demo">
      <ul className={styles.links}>
        {demoLinks.map((link) => (
          <li key={link.href}>
            <LocalizedLink href={link.href} prefetch={link.shouldPrefetch}>{link.label}</LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
