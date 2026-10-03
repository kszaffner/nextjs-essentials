"use client";

import { useRouter } from "next/navigation";
import styles from "./Layers.module.css";

export function BackButton() {
  const router = useRouter();

  return (
    <button type="button" className={styles.button} onClick={() => router.back()}>
      router.back()
    </button>
  );
}
