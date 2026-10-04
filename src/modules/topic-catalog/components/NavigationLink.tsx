"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LocalizedLink, useLocale, localizePath } from "@/shared/i18n";
import styles from "./TopicNavigation.module.css";

type NavigationLinkProps = {
  href: string;
  children: ReactNode;
};

export function NavigationLink({ href, children }: NavigationLinkProps) {
  const pathname = usePathname();
  const isCurrentPage = pathname === localizePath(useLocale(), href);

  return (
    <LocalizedLink
      href={href}
      className={styles.link}
      aria-current={isCurrentPage ? "page" : undefined}
    >
      {children}
    </LocalizedLink>
  );
}
