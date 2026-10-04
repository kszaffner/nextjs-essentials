"use client";

import { useEffect, useState } from "react";
import { messages, useLocale } from "@/shared/i18n";
import styles from "./UnderTheHood.module.css";

type LoggedResource = {
  name: string;
  kind: string;
  startMilliseconds: number;
  transferBytes: number;
};

type ResourceLogProps = {
  // Only requests whose URL contains this text are listed, for example "/_next/static/chunks/".
  urlIncludes: string;
  // Optionally, only URLs (before any query) ending like this, for example ".js".
  fileExtension?: string;
};

// Built assets are long hashed paths, so only the file name is informative;
// for pages and RSC requests the whole path and query is the point.
function shortName(url: URL): string {
  return url.pathname.startsWith("/_next/static/")
    ? (url.pathname.split("/").at(-1) ?? url.pathname)
    : `${url.pathname}${url.search}`;
}

function matches(url: string, urlIncludes: string, fileExtension: string | undefined): boolean {
  return url.includes(urlIncludes) && (fileExtension === undefined || url.split("?")[0]?.endsWith(fileExtension) === true);
}

function describe(entry: PerformanceResourceTiming): LoggedResource {
  return {
    name: shortName(new URL(entry.name)),
    kind: entry.initiatorType,
    startMilliseconds: Math.round(entry.startTime),
    transferBytes: entry.transferSize,
  };
}

// A live view of the browser's own resource timeline (what the Network tab
// shows): the list grows when the page requests something new. "Clear" empties
// it, so what appears next is exactly what the next action requested.
export function ResourceLog({ urlIncludes, fileExtension }: ResourceLogProps) {
  const text = messages[useLocale()].underTheHood;
  const [resources, setResources] = useState<readonly LoggedResource[]>([]);
  const [clearedAt, setClearedAt] = useState(0);

  // The browser's timeline is an external system, so subscribing is an effect.
  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") {
      return;
    }
    const observer = new PerformanceObserver((list) => {
      const fresh = list
        .getEntries()
        .filter(
          (entry): entry is PerformanceResourceTiming =>
            entry.startTime >= clearedAt && matches(entry.name, urlIncludes, fileExtension),
        )
        .map(describe);
      if (fresh.length > 0) {
        setResources((current) => [...current, ...fresh]);
      }
    });
    observer.observe({ type: "resource", buffered: true });
    return () => observer.disconnect();
  }, [urlIncludes, fileExtension, clearedAt]);

  function clear() {
    setResources([]);
    setClearedAt(performance.now());
  }

  return (
    <div role="status" aria-live="polite">
      <p className={styles.note}>{text.requestsMatching(urlIncludes, resources.length)}</p>
      <button type="button" className={styles.button} onClick={clear}>
        {text.clear}
      </button>
      {resources.length === 0 ? null : <ResourceTable resources={resources} />}
    </div>
  );
}

function ResourceTable({ resources }: { resources: readonly LoggedResource[] }) {
  const text = messages[useLocale()].underTheHood;

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{text.columns.file}</th>
            <th scope="col">{text.columns.start}</th>
            <th scope="col">{text.columns.size}</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={`${resource.name}-${resource.startMilliseconds}`}>
              <td>
                <code>{resource.name}</code>
              </td>
              <td>{resource.startMilliseconds} ms</td>
              <td>{resource.transferBytes === 0 ? text.cached : `${resource.transferBytes} B`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
