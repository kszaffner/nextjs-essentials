"use client";

import { useDynamicImportText } from "../text";
import styles from "./Dynamic.module.css";

// DYNAMIC_IMPORT_HEAVY_MARKER: lives only in the chunk that holds this file.
const PRIMES_TO_FIND = 2000;

function findPrimes(count: number): number[] {
  const primes: number[] = [];
  for (let candidate = 2; primes.length < count; candidate += 1) {
    if (primes.every((prime) => candidate % prime !== 0)) {
      primes.push(candidate);
    }
  }
  return primes;
}

// Stands in for something genuinely heavy (a chart or editor library) that
// most visitors never open.
export function HeavyPanel() {
  const text = useDynamicImportText().heavy;
  const primes = findPrimes(PRIMES_TO_FIND);

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.hint}>{text.result(PRIMES_TO_FIND, primes.at(-1))}</p>
    </section>
  );
}
