import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n";
import { getRuntimesText } from "../text";
import styles from "./Runtimes.module.css";

type RuntimeTableProps = {
  locale: Locale;
  children: ReactNode;
};

export function RuntimeTable({ locale, children }: RuntimeTableProps) {
  const text = getRuntimesText(locale).table;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">{text.code}</th>
          <th scope="col">NEXT_RUNTIME</th>
          <th scope="col">{text.detail}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
