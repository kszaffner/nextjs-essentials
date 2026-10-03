import type { ClockReading, FetchVariant } from "../server/clockClient";
import styles from "./FetchLab.module.css";

type ReadingsTableProps = {
  variantReadings: readonly { variant: FetchVariant; reading: ClockReading }[];
  memoizedPair: readonly [ClockReading, ClockReading];
};

export function ReadingsTable({ variantReadings, memoizedPair }: ReadingsTableProps) {
  const [firstMemoized, secondMemoized] = memoizedPair;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">fetch() options</th>
          <th scope="col">API hits</th>
          <th scope="col">served at</th>
        </tr>
      </thead>
      <tbody>
        {variantReadings.map(({ variant, reading }) => (
          <tr key={variant.id}>
            <th scope="row">{variant.label}</th>
            <td className={styles.code}>{reading.hits}</td>
            <td className={styles.code}>{reading.servedAt}</td>
          </tr>
        ))}
        <tr>
          <th scope="row">same URL twice in one render</th>
          <td className={styles.code}>
            {firstMemoized.hits} and {secondMemoized.hits}
          </td>
          <td className={styles.code}>{firstMemoized.servedAt}</td>
        </tr>
      </tbody>
    </table>
  );
}
