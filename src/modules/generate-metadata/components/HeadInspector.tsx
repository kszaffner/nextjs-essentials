"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n";
import { getGenerateMetadataText } from "../text";
import styles from "./GenerateMetadata.module.css";

const INSPECTED_SELECTORS = [
  'meta[name="description"]',
  'link[rel="canonical"]',
  'meta[property^="og:"]',
] as const;

function readHead(): string {
  const lines = [`<title>${document.title}</title>`];
  for (const element of document.head.querySelectorAll(INSPECTED_SELECTORS.join(","))) {
    lines.push(element.outerHTML);
  }
  return lines.join("\n");
}

// Reads the real <head> on demand. Next.js may stream metadata into the page
// after the first paint, so the tags are read when asked for, not at load.
export function HeadInspector({ locale }: { locale: Locale }) {
  const [head, setHead] = useState<string | null>(null);

  return (
    <div>
      <button type="button" className={styles.button} onClick={() => setHead(readHead())}>
        {getGenerateMetadataText(locale).head.button}
      </button>
      {head ? (
        <pre className={styles.result} role="status">
          {head}
        </pre>
      ) : null}
    </div>
  );
}
