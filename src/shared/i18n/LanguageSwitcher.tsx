"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "./config";
import { useLocale } from "./LocaleProvider";
import { switchLocalePath } from "./paths";
import styles from "./LanguageSwitcher.module.css";

// Same page, other language. The labels are endonyms, so they are not translated.
export function LanguageSwitcher({ label }: { label: string }) {
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className={styles.list}>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={switchLocalePath(pathname, locale)}
              hrefLang={locale}
              lang={locale}
              className={styles.link}
              aria-current={locale === currentLocale ? "true" : undefined}
              // Prefetching the other language would run the proxy, which
              // stores the visited language in a cookie, before it is chosen.
              prefetch={false}
            >
              {locale.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
