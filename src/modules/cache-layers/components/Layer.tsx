import type { ReactNode } from "react";
import styles from "./Layers.module.css";

type LayerProps = {
  title: string;
  hint: string;
  children: ReactNode;
};

export function Layer({ title, hint, children }: LayerProps) {
  return (
    <li className={styles.layer}>
      <p className={styles.layerTitle}>{title}</p>
      <p className={styles.readout}>{children}</p>
      <p className={styles.hint}>{hint}</p>
    </li>
  );
}
