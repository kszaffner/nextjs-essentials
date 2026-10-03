"use client";

import styles from "./PropInspector.module.css";

type PropInspectorProps = {
  // The keys the server put in `values`, so a key lost in transit shows up.
  sentKeys: readonly string[];
  values: Record<string, unknown>;
};

function describeConstructor(value: unknown): string {
  if (value === null || value === undefined) {
    return "none";
  }
  return Object.getPrototypeOf(value)?.constructor?.name ?? "none";
}

function describeValue(value: unknown): string {
  if (typeof value === "bigint") {
    return `${value.toString()}n`;
  }
  if (value instanceof Map) {
    return JSON.stringify([...value.entries()]);
  }
  if (value instanceof Set) {
    return JSON.stringify([...value.values()]);
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value === undefined ? "undefined" : JSON.stringify(value);
}

// A Client Component: it only sees what the RSC payload carried across the
// boundary, so each row shows what actually arrived in the browser.
export function PropInspector({ sentKeys, values }: PropInspectorProps) {
  return (
    <div>
      <table className={styles.table}>
        <caption className={styles.caption}>
          Sent from a Server Component, received in a Client Component
        </caption>
        <thead>
          <tr>
            <th scope="col">Prop</th>
            <th scope="col">typeof</th>
            <th scope="col">constructor</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {sentKeys.map((name) => {
            const value = values[name];
            return (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td className={styles.code}>{typeof value}</td>
                <td className={styles.code}>{describeConstructor(value)}</td>
                <td className={styles.code}>
                  {describeValue(value)}
                  {name in values ? "" : " (the key itself is gone)"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
