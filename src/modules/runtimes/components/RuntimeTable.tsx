import type { ReactNode } from "react";
import styles from "./Runtimes.module.css";

type RuntimeTableProps = {
  children: ReactNode;
};

export function RuntimeTable({ children }: RuntimeTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Code that ran</th>
          <th scope="col">NEXT_RUNTIME</th>
          <th scope="col">Detail</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
