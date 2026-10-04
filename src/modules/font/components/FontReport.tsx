"use client";

import { useState } from "react";
import styles from "./Font.module.css";

function describeFonts(): string {
  const faces = [...document.fonts].map((face) => `${face.family} ${face.weight} ${face.style}: ${face.status}`);
  const samples = [...document.querySelectorAll<HTMLElement>("[data-font-sample]")].map(
    (element) => `${element.dataset.fontSample}: ${getComputedStyle(element).fontFamily}`,
  );

  return [`font faces known to the page (${faces.length}):`, ...faces, "", "computed font-family:", ...samples].join("\n");
}

export function FontReport() {
  const [report, setReport] = useState<string | null>(null);

  return (
    <div>
      <button type="button" className={styles.button} onClick={() => setReport(describeFonts())}>
        Which fonts did the browser load?
      </button>
      {report ? (
        <pre className={styles.report} role="status">
          {report}
        </pre>
      ) : null}
    </div>
  );
}
