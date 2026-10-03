"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./TopicNavigation.module.css";

type NavigationLinkProps = {
  href: string;
  children: ReactNode;
};

export function NavigationLink({ href, children }: NavigationLinkProps) {
  const pathname = usePathname();
  const isCurrentPage = pathname === href;

  return (
    <Link
      href={href}
      className={styles.link}
      aria-current={isCurrentPage ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
