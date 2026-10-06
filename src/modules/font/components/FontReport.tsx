"use client";

import { useState } from "react";
import { useFontText } from "../text";
import styles from "./Font.module.css";

export function FontReport() {
  const text = useFontText().report;
  const [report, setReport] = useState<string | null>(null);

  function describeFonts(): string {
    const faces = [...document.fonts].map((face) => `${face.family} ${face.weight} ${face.style}: ${face.status}`);
    const samples = [...document.querySelectorAll<HTMLElement>("[data-font-sample]")].map(
      (element) => `${element.dataset.fontSample}: ${getComputedStyle(element).fontFamily}`,
    );

    return [text.faces(faces.length), ...faces, "", text.computed, ...samples].join("\n");
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={() => setReport(describeFonts())}>
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
