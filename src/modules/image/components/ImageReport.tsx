"use client";

import { useState } from "react";
import { useImageText } from "../text";
import styles from "./ImageDemo.module.css";

// Reads what the browser really did, on demand: scroll first, then press it.
export function ImageReport() {
  const text = useImageText().report;
  const [report, setReport] = useState<string | null>(null);

  function describeImages(): string {
    const requests = performance
      .getEntriesByType("resource")
      .filter((entry) => entry.name.includes("/_next/image"));
    const images = [...document.querySelectorAll<HTMLImageElement>("main img")];

    const requestLines = requests.map((entry) => {
      const { searchParams } = new URL(entry.name);
      return text.requested(searchParams.get("url"), searchParams.get("w"), searchParams.get("q"));
    });
    const imageLines = images.map((image) => {
      const isLoaded = image.complete && image.naturalWidth > 0;
      return `<img loading="${image.loading}" ${isLoaded ? text.loaded : text.notLoaded}> ${image.getAttribute("alt")}`;
    });

    return [text.requestCount(requests.length), ...requestLines, "", ...imageLines].join("\n");
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={() => setReport(describeImages())}>
        {text.button}
      </button>
      {report ? (
        <pre className={styles.report} role="status">
          {report}
        </pre>
      ) : null}
    </div>
  );
}
