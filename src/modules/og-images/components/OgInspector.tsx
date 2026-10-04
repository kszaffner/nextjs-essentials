"use client";

import { useState } from "react";
import styles from "./OgImages.module.css";

const OG_PROPERTIES = ["og:image", "og:image:width", "og:image:height", "og:image:alt", "og:image:type"];

function readOgTags(): string {
  const lines = OG_PROPERTIES.map((property) => {
    const content = document.head.querySelector(`meta[property="${property}"]`)?.getAttribute("content");
    return `${property}: ${content ?? "(not set)"}`;
  });
  const twitter = document.head.querySelector('meta[name="twitter:image"]')?.getAttribute("content");
  return [...lines, `twitter:image: ${twitter ?? "(not set)"}`].join("\n");
}

export function OgInspector() {
  const [tags, setTags] = useState<string | null>(null);

  return (
    <div>
      <button type="button" className={styles.button} onClick={() => setTags(readOgTags())}>
        Show this page&apos;s image tags
      </button>
      {tags ? (
        <pre className={styles.result} role="status">
          {tags}
        </pre>
      ) : null}
    </div>
  );
}
