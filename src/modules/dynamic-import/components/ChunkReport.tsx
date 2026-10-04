"use client";

import { useState } from "react";
import styles from "./Dynamic.module.css";

type ChunkReportProps = {
  // performance.now() when the panel was requested; chunks that started
  // loading after it were pulled in by that action.
  since: number | null;
};

function listScripts(since: number | null): string {
  const scripts = performance
    .getEntriesByType("resource")
    .filter((entry) => entry.name.includes("/_next/static/chunks/") && entry.name.endsWith(".js"));
  const fresh = scripts.filter((entry) => since !== null && entry.startTime >= since);

  return [
    `script chunks loaded so far: ${scripts.length}`,
    since === null
      ? "(open the heavy panel first, then ask again)"
      : `loaded after you opened the panel: ${fresh.length}`,
    ...fresh.map((entry) => `  ${new URL(entry.name).pathname.split("/").at(-1)}`),
  ].join("\n");
}

export function ChunkReport({ since }: ChunkReportProps) {
  const [report, setReport] = useState<string | null>(null);

  return (
    <div>
      <button type="button" className={styles.button} onClick={() => setReport(listScripts(since))}>
        Which scripts were loaded?
      </button>
      {report ? (
        <pre className={styles.report} role="status">
          {report}
        </pre>
      ) : null}
    </div>
  );
}
