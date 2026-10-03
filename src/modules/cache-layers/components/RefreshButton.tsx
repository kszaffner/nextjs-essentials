"use client";

import { useRouter } from "next/navigation";
import styles from "./Layers.module.css";

export function RefreshButton() {
  const router = useRouter();

  return (
    <button type="button" className={styles.button} onClick={() => router.refresh()}>
      router.refresh()
    </button>
  );
}
