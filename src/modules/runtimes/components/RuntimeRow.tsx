import styles from "./Runtimes.module.css";

type RuntimeRowProps = {
  where: string;
  runtime: string;
  detail: string;
};

export function RuntimeRow({ where, runtime, detail }: RuntimeRowProps) {
  return (
    <tr>
      <th scope="row">{where}</th>
      <td className={styles.code}>{runtime}</td>
      <td className={styles.code}>{detail}</td>
    </tr>
  );
}
