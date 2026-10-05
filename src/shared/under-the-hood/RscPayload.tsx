"use client";

import { useState } from "react";
import { messages, useLocale, useLocalizedPath } from "@/shared/i18n";
import styles from "./UnderTheHood.module.css";

type RscPayloadProps = {
  // Internal page path without a language prefix.
  path: string;
  // Only payload lines containing this text are shown (the whole payload is large).
  lineIncludes: string;
};

const CONTEXT_BEFORE = 40;
const CONTEXT_AFTER = 700;

// A payload line can be thousands of characters of page structure; show the
// stretch around the match, which is where the props are.
function excerptAround(line: string, needle: string): string {
  const at = line.indexOf(needle);
  const start = Math.max(0, at - CONTEXT_BEFORE);
  const end = Math.min(line.length, at + needle.length + CONTEXT_AFTER);
  return `${start > 0 ? "…" : ""}${line.slice(start, end)}${end < line.length ? "…" : ""}`;
}

// Requests a page the way the App Router does for a client navigation (the RSC
// header) and shows the lines of the flight payload that carry the data.
export function RscPayload({ path, lineIncludes }: RscPayloadProps) {
  const text = messages[useLocale()].underTheHood;
  const localize = useLocalizedPath();
  const [shown, setShown] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  async function load() {
    setFailure(null);
    try {
      const response = await fetch(localize(path), { headers: { RSC: "1" }, cache: "no-store" });
      const lines = (await response.text()).split("\n").filter((line) => line.includes(lineIncludes));
      setShown(lines.map((line) => excerptAround(line, lineIncludes)).join("\n"));
    } catch {
      // A failed request is something the visitor can retry, so say so.
      setFailure(text.fetchFailed);
    }
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={load}>
        {text.loadPayload}
      </button>
      {failure ? <p role="alert">{failure}</p> : null}
      {shown === null ? null : (
        <pre className={styles.code} role="status">
          <code>{shown === "" ? text.nothingMatched : shown}</code>
        </pre>
      )}
    </div>
  );
}
