import type { ReactNode } from "react";
import styles from "./Ppr.module.css";

type PprPartProps = {
  title: string;
  hint: string;
  children?: ReactNode;
};

export function PprPart({ title, hint, children }: PprPartProps) {
  return (
    <li className={styles.part}>
      <p className={styles.partTitle}>{title}</p>
      {children ? <p className={styles.readout}>{children}</p> : null}
      <p className={styles.hint}>{hint}</p>
    </li>
  );
}
