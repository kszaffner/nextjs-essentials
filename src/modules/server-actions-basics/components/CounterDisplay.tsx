import { connection } from "next/server";
import { readCount } from "../server/counterStore";
import styles from "./Actions.module.css";

export async function CounterDisplay() {
  await connection();

  return (
    <p className={styles.readout} role="status">
      server counter: {readCount()}
    </p>
  );
}
