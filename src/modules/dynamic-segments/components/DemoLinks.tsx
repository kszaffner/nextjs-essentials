"use client";

import { LocalizedLink } from "@/shared/i18n";
import { type DemoLinkKey, useDynamicSegmentsText } from "../text";
import styles from "./ParamsReport.module.css";

const demoBase = "/fundamentals/dynamic-segments/demo";

const demoLinks: readonly { href: string; key: DemoLinkKey }[] = [
  { href: `${demoBase}/blog/hello-nextjs`, key: "blogPrerendered" },
  { href: `${demoBase}/blog/surprise`, key: "blogRuntime" },
  { href: `${demoBase}/blog/featured`, key: "blogFeatured" },
  { href: `${demoBase}/validated/1`, key: "validatedKnown" },
  { href: `${demoBase}/validated/99`, key: "validatedUnknown" },
  { href: `${demoBase}/shop/clothes/tops/t-shirts`, key: "shopThree" },
  { href: `${demoBase}/shop`, key: "shopNone" },
  { href: `${demoBase}/docs`, key: "docsNone" },
  { href: `${demoBase}/docs/getting-started/install`, key: "docsTwo" },
];

export function DemoLinks() {
  const text = useDynamicSegmentsText();

  return (
    <nav aria-label={text.navigationLabel}>
      <ul className={styles.links}>
        {demoLinks.map((link) => (
          <li key={link.href}>
            <LocalizedLink href={link.href} prefetch={false}>
              {text.links[link.key]}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
