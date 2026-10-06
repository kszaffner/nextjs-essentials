"use client";

import { useState, useSyncExternalStore } from "react";
import {
  formatVitalValue,
  isVitalName,
  rateVital,
  type VitalRating,
} from "../vitalsRating";
import {
  getServerVitalsSnapshot,
  getVitalsSnapshot,
  subscribeToVitals,
} from "../vitalsStore";
import { useWebVitalsText } from "../text";
import styles from "./WebVitals.module.css";

const RATING_CLASS: Record<VitalRating, string | undefined> = {
  good: styles.good,
  "needs improvement": undefined,
  poor: styles.poor,
};

export function VitalsPanel() {
  const text = useWebVitalsText();
  const vitals = useSyncExternalStore(subscribeToVitals, getVitalsSnapshot, getServerVitalsSnapshot);
  const [clicks, setClicks] = useState(0);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      {vitals.length === 0 ? (
        <p className={styles.hint}>{text.empty}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">{text.columns.metric}</th>
              <th scope="col">{text.columns.value}</th>
              <th scope="col">{text.columns.rating}</th>
            </tr>
          </thead>
          <tbody>
            {vitals.map((vital) => {
              const rating = isVitalName(vital.name) ? rateVital(vital.name, vital.value) : undefined;
              return (
                <tr key={vital.name}>
                  <th scope="row">{vital.name}</th>
                  <td className={styles.code}>
                    {isVitalName(vital.name) ? formatVitalValue(vital.name, vital.value) : vital.value}
                  </td>
                  <td className={rating ? RATING_CLASS[rating] : undefined}>{rating ? text.ratings[rating] : text.notAvailable}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button type="button" className={styles.button} onClick={() => setClicks(clicks + 1)}>
        {text.button(clicks)}
      </button>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
