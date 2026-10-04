import styles from "./ParamsReport.module.css";
import { LocalizedLink } from "@/shared/i18n";

const demoBase = "/fundamentals/dynamic-segments/demo";

const demoLinks = [
  { href: `${demoBase}/blog/hello-nextjs`, label: "[slug]: prerendered slug" },
  { href: `${demoBase}/blog/surprise`, label: "[slug]: slug not in generateStaticParams" },
  { href: `${demoBase}/blog/featured`, label: "blog/featured: static segment wins over [slug]" },
  { href: `${demoBase}/validated/1`, label: "validated/[id]: known id" },
  { href: `${demoBase}/validated/99`, label: "validated/[id]: unknown id (notFound())" },
  { href: `${demoBase}/shop/clothes/tops/t-shirts`, label: "shop/[...slug]: three segments" },
  { href: `${demoBase}/shop`, label: "shop: no segments (404, catch-all is not optional)" },
  { href: `${demoBase}/docs`, label: "docs/[[...slug]]: no segments (params is empty)" },
  { href: `${demoBase}/docs/getting-started/install`, label: "docs/[[...slug]]: two segments" },
] as const;

export function DemoLinks() {
  return (
    <nav aria-label="Dynamic segments demo">
      <ul className={styles.links}>
        {demoLinks.map((link) => (
          <li key={link.href}>
            <LocalizedLink href={link.href} prefetch={false}>
              {link.label}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
