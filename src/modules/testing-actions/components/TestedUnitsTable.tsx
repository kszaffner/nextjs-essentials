import type { Locale } from "@/shared/i18n";
import { testedUnits } from "../testedUnits";
import { getTestingActionsText } from "../text";
import styles from "./TestedUnits.module.css";

export function TestedUnitsTable({ locale }: { locale: Locale }) {
  const text = getTestingActionsText(locale);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{text.table.what}</th>
            <th scope="col">{text.table.technique}</th>
            <th scope="col">{text.table.file}</th>
          </tr>
        </thead>
        <tbody>
          {testedUnits.map((unit) => (
            <tr key={unit.testFile}>
              <th scope="row">{text.units[unit.id].title}</th>
              <td>{text.units[unit.id].technique}</td>
              <td className={styles.file}>{unit.testFile}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.hint}>
        {text.table.footerBefore} <code>pnpm test</code>
        {text.table.footerAfter}
      </p>
    </div>
  );
}
