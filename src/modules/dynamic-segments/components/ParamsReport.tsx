import styles from "./ParamsReport.module.css";

type RouteParams = Record<string, string | string[] | undefined>;

type ParamsReportProps = {
  routePattern: string;
  params: RouteParams;
  note?: string;
};

function describeParamValue(value: string | string[] | undefined): string {
  return value === undefined ? "undefined" : JSON.stringify(value);
}

export function ParamsReport({ routePattern, params, note }: ParamsReportProps) {
  const entries = Object.entries(params);

  return (
    <section className={styles.report}>
      <h3>
        Route <span className={styles.pattern}>{routePattern}</span>
      </h3>
      {entries.length === 0 ? (
        <p>
          <code>params</code> is an empty object: no dynamic segment was
          captured.
        </p>
      ) : (
        <ul className={styles.params}>
          {entries.map(([name, value]) => (
            <li key={name}>
              params.{name} = {describeParamValue(value)}
            </li>
          ))}
        </ul>
      )}
      {note ? <p className={styles.note}>{note}</p> : null}
    </section>
  );
}
