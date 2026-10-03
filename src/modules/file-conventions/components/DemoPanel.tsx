import type { ReactNode } from "react";
import styles from "./Demo.module.css";

type DemoPanelProps = {
  title: string;
  children?: ReactNode;
};

export function DemoPanel({ title, children }: DemoPanelProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.panelTitle}>{title}</h3>
      {children}
    </section>
  );
}
