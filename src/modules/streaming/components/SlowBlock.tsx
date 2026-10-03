import { connection } from "next/server";
import styles from "./Streaming.module.css";

type SlowBlockProps = {
  label: string;
  delayMs: number;
};

// connection() makes the render per-request, so the delay really happens
// while the response is being streamed.
export async function SlowBlock({ label, delayMs }: SlowBlockProps) {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  return (
    <div className={styles.block}>
      <strong>{label}</strong>
      <p>resolved after {delayMs} ms</p>
    </div>
  );
}
