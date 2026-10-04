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
import styles from "./WebVitals.module.css";

const RATING_CLASS: Record<VitalRating, string | undefined> = {
  good: styles.good,
  "needs improvement": undefined,
  poor: styles.poor,
};

export function VitalsPanel() {
  const vitals = useSyncExternalStore(subscribeToVitals, getVitalsSnapshot, getServerVitalsSnapshot);
  const [clicks, setClicks] = useState(0);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Metrics reported in this tab</h3>
      {vitals.length === 0 ? (
        <p className={styles.hint}>Nothing reported yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Value</th>
              <th scope="col">Rating</th>
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
                  <td className={rating ? RATING_CLASS[rating] : undefined}>{rating ?? "n/a"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button type="button" className={styles.button} onClick={() => setClicks(clicks + 1)}>
        Interact with the page ({clicks})
      </button>
      <p className={styles.hint}>
        TTFB and FCP appear on load. LCP is final after your first interaction or
        when the tab is hidden, and INP needs an interaction: press the button.
      </p>
    </section>
  );
}
