import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { readCount } from "../server/counterStore";
import { getServerActionsBasicsText } from "../text";
import styles from "./Actions.module.css";

export async function CounterDisplay({ locale }: { locale: Locale }) {
  await connection();

  return (
    <p className={styles.readout} role="status">
      {getServerActionsBasicsText(locale).serverCounter} {readCount()}
    </p>
  );
}
