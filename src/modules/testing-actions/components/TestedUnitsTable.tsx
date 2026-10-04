import { testedUnits } from "../testedUnits";
import styles from "./TestedUnits.module.css";

export function TestedUnitsTable() {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">What is tested</th>
            <th scope="col">Technique</th>
            <th scope="col">Test file</th>
          </tr>
        </thead>
        <tbody>
          {testedUnits.map((unit) => (
            <tr key={unit.testFile}>
              <th scope="row">{unit.title}</th>
              <td>{unit.technique}</td>
              <td className={styles.file}>{unit.testFile}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.hint}>
        Every row is a real test in this repository; run them with{" "}
        <code>pnpm test</code>.
      </p>
    </div>
  );
}
