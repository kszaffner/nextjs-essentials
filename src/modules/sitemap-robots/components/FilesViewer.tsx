"use client";

import { useState } from "react";
import styles from "./SiteFiles.module.css";

const MAX_LINES = 14;

async function describeFile(path: string): Promise<string> {
  const response = await fetch(path);
  const text = await response.text();
  const lines = text.split("\n");
  const shown = lines.slice(0, MAX_LINES).join("\n");
  const more = lines.length > MAX_LINES ? `\n… (${lines.length - MAX_LINES} more lines)` : "";

  return [
    `GET ${path}`,
    `-> ${response.status} ${response.statusText}`,
    `content-type: ${response.headers.get("content-type") ?? "(none)"}`,
    "",
    shown + more,
  ].join("\n");
}

export function FilesViewer() {
  const [result, setResult] = useState("Press a button to fetch a file.");

  async function show(path: string) {
    setResult(`Fetching ${path}…`);
    try {
      setResult(await describeFile(path));
    } catch (error) {
      // A network failure is something the user can retry, so show it.
      setResult(`Could not fetch ${path}: ${error instanceof Error ? error.message : "unknown error"}`);
    }
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>The generated files</h3>
      <div className={styles.buttons}>
        <button type="button" className={styles.button} onClick={() => show("/sitemap.xml")}>
          Fetch /sitemap.xml
        </button>
        <button type="button" className={styles.button} onClick={() => show("/robots.txt")}>
          Fetch /robots.txt
        </button>
      </div>
      <pre className={styles.result} role="status">
        {result}
      </pre>
    </section>
  );
}
