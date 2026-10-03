import type { ReactNode } from "react";
import styles from "./SiteShell.module.css";

type SiteShellProps = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

export function SiteShell({ header, sidebar, children }: SiteShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>{header}</header>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
