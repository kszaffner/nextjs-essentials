import type { ReactNode } from "react";
import styles from "./Strategies.module.css";

type StrategyProps = {
  title: string;
  hint: string;
  children: ReactNode;
};

export function Strategy({ title, hint, children }: StrategyProps) {
  return (
    <li className={styles.strategy}>
      <p className={styles.strategyTitle}>{title}</p>
      <p className={styles.readout}>{children}</p>
      <p className={styles.hint}>{hint}</p>
    </li>
  );
}
