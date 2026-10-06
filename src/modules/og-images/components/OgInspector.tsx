"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n";
import { getOgImagesText } from "../text";
import styles from "./OgImages.module.css";

const OG_PROPERTIES = ["og:image", "og:image:width", "og:image:height", "og:image:alt", "og:image:type"];

function readOgTags(notSet: string): string {
  const lines = OG_PROPERTIES.map((property) => {
    const content = document.head.querySelector(`meta[property="${property}"]`)?.getAttribute("content");
    return `${property}: ${content ?? notSet}`;
  });
  const twitter = document.head.querySelector('meta[name="twitter:image"]')?.getAttribute("content");
  return [...lines, `twitter:image: ${twitter ?? notSet}`].join("\n");
}

export function OgInspector({ locale }: { locale: Locale }) {
  const text = getOgImagesText(locale).inspector;
  const [tags, setTags] = useState<string | null>(null);

  return (
    <div>
      <button type="button" className={styles.button} onClick={() => setTags(readOgTags(text.notSet))}>
        {text.button}
      </button>
      {tags ? (
        <pre className={styles.result} role="status">
          {tags}
        </pre>
      ) : null}
    </div>
  );
}
