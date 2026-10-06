"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n";
import { getSitemapRobotsText, type SiteFilesText } from "../text";
import styles from "./SiteFiles.module.css";

const MAX_LINES = 14;

async function describeFile(path: string, labels: SiteFilesText): Promise<string> {
  const response = await fetch(path);
  const body = await response.text();
  const lines = body.split("\n");
  const shown = lines.slice(0, MAX_LINES).join("\n");
  const more = lines.length > MAX_LINES ? `\n${labels.more(lines.length - MAX_LINES)}` : "";

  return [
    `GET ${path}`,
    `-> ${response.status} ${response.statusText}`,
    `content-type: ${response.headers.get("content-type") ?? labels.none}`,
    "",
    shown + more,
  ].join("\n");
}

export function FilesViewer({ locale }: { locale: Locale }) {
  const text = getSitemapRobotsText(locale).viewer;
  const [result, setResult] = useState(text.prompt);

  async function show(path: string) {
    setResult(text.fetching(path));
    try {
      setResult(await describeFile(path, text));
    } catch (error) {
      // A network failure is something the user can retry, so show it.
      setResult(text.failed(path, error instanceof Error ? error.message : text.unknownError));
    }
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <div className={styles.buttons}>
        <button type="button" className={styles.button} onClick={() => show("/sitemap.xml")}>
          {text.fetchSitemap}
        </button>
        <button type="button" className={styles.button} onClick={() => show("/robots.txt")}>
          {text.fetchRobots}
        </button>
      </div>
      <pre className={styles.result} role="status">
        {result}
      </pre>
    </section>
  );
}
