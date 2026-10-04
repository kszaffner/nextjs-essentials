import type { Locale } from "@/shared/i18n";
import { getDynamicSegmentsText } from "../text";
import styles from "./ParamsReport.module.css";

type RouteParams = Record<string, string | string[] | undefined>;

type ParamsReportProps = {
  locale: Locale;
  routePattern: string;
  // Exactly what the page received, including the site's own lang segment.
  params: RouteParams;
  note?: string;
};

// The root layout lives in app/[lang], so every page also receives lang.
const SITE_PARAM = "lang";

function describeParamValue(value: string | string[] | undefined): string {
  return value === undefined ? "undefined" : JSON.stringify(value);
}

export function ParamsReport({ locale, routePattern, params, note }: ParamsReportProps) {
  const text = getDynamicSegmentsText(locale).report;
  const entries = Object.entries(params);
  const demoEntries = entries.filter(([name]) => name !== SITE_PARAM);

  return (
    <section className={styles.report}>
      <h3>
        {text.route} <span className={styles.pattern}>{routePattern}</span>
      </h3>
      {demoEntries.length === 0 ? <p>{text.emptyParams}</p> : null}
      <ul className={styles.params}>
        {entries.map(([name, value]) => (
          <li key={name}>
            params.{name} = {describeParamValue(value)}
            {name === SITE_PARAM ? <span className={styles.note}> {text.languageSegment}</span> : null}
          </li>
        ))}
      </ul>
      {note ? <p className={styles.note}>{note}</p> : null}
    </section>
  );
}
