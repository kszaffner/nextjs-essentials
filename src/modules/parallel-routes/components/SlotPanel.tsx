import type { ReactNode } from "react";
import styles from "./Slots.module.css";

type SlotPanelProps = {
  slotName: string;
  title: string;
  children: ReactNode;
};

export function SlotPanel({ slotName, title, children }: SlotPanelProps) {
  return (
    <section className={styles.panel}>
      <p className={styles.slotName}>{slotName}</p>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
