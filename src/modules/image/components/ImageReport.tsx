"use client";

import { useState } from "react";
import styles from "./ImageDemo.module.css";

function describeImages(): string {
  const requests = performance
    .getEntriesByType("resource")
    .filter((entry) => entry.name.includes("/_next/image"));
  const images = [...document.querySelectorAll<HTMLImageElement>("main img")];

  const requestLines = requests.map((entry) => {
    const url = new URL(entry.name);
    return `requested: ${url.searchParams.get("url")} w=${url.searchParams.get("w")} q=${url.searchParams.get("q")}`;
  });
  const imageLines = images.map((image) => {
    const loaded = image.complete && image.naturalWidth > 0;
    return `<img loading="${image.loading}" ${loaded ? "loaded" : "NOT loaded yet"}> ${image.getAttribute("alt")}`;
  });

  return [`image requests so far: ${requests.length}`, ...requestLines, "", ...imageLines].join("\n");
}

// Reads what the browser really did, on demand: scroll first, then press it.
export function ImageReport() {
  const [report, setReport] = useState<string | null>(null);

  return (
    <div>
      <button type="button" className={styles.button} onClick={() => setReport(describeImages())}>
        What has the browser loaded?
      </button>
      {report ? (
        <pre className={styles.report} role="status">
          {report}
        </pre>
      ) : null}
    </div>
  );
}
