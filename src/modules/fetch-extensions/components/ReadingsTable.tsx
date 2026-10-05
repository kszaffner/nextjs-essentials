import type { Locale } from "@/shared/i18n";
import type { ClockReading, FetchVariant } from "../server/clockClient";
import { getFetchExtensionsText } from "../text";
import styles from "./FetchLab.module.css";

type ReadingsTableProps = {
  locale: Locale;
  variantReadings: readonly { variant: FetchVariant; reading: ClockReading }[];
  memoizedPair: readonly [ClockReading, ClockReading];
};

export function ReadingsTable({ locale, variantReadings, memoizedPair }: ReadingsTableProps) {
  const text = getFetchExtensionsText(locale);
  const [firstMemoized, secondMemoized] = memoizedPair;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">{text.columns.options}</th>
          <th scope="col">{text.columns.hits}</th>
          <th scope="col">{text.columns.servedAt}</th>
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
          <th scope="row">{text.memoizedRow}</th>
          <td className={styles.code}>
            {firstMemoized.hits} {text.and} {secondMemoized.hits}
          </td>
          <td className={styles.code}>{firstMemoized.servedAt}</td>
        </tr>
      </tbody>
    </table>
  );
}
