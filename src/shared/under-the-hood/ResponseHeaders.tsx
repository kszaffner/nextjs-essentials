"use client";

import { useState } from "react";
import { messages, useLocale, useLocalizedPath } from "@/shared/i18n";
import styles from "./UnderTheHood.module.css";

type ResponseHeadersProps = {
  // Internal page paths without a language prefix, for example "/rendering/isr/demo".
  paths: readonly string[];
  // Header names to show for each response.
  headerNames: readonly string[];
};

type FetchedResponse = {
  path: string;
  status: number;
  headers: readonly { name: string; value: string }[];
};

// Fetches the pages from the browser and shows what the server really sent,
// the same headers the Network tab lists.
export function ResponseHeaders({ paths, headerNames }: ResponseHeadersProps) {
  const text = messages[useLocale()].underTheHood;
  const localize = useLocalizedPath();
  const [responses, setResponses] = useState<readonly FetchedResponse[]>([]);
  const [failure, setFailure] = useState<string | null>(null);

  async function fetchAll() {
    setFailure(null);
    try {
      const fetched = await Promise.all(
        paths.map(async (path) => {
          const response = await fetch(localize(path), { cache: "no-store" });
          return {
            path: localize(path),
            status: response.status,
            headers: headerNames.map((name) => ({ name, value: response.headers.get(name) ?? text.absent })),
          };
        }),
      );
      setResponses(fetched);
    } catch {
      // A failed request is something the visitor can retry, so say so.
      setFailure(text.fetchFailed);
    }
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={fetchAll}>
        {text.fetchHeaders}
      </button>
      {failure ? <p role="alert">{failure}</p> : null}
      <div role="status" aria-live="polite">
        {responses.map((response) => (
          <ResponseTable key={response.path} response={response} />
        ))}
      </div>
    </div>
  );
}

function ResponseTable({ response }: { response: FetchedResponse }) {
  return (
    <table className={styles.table}>
      <caption className={styles.caption}>
        <code>GET {response.path}</code> → {response.status}
      </caption>
      <tbody>
        {response.headers.map((header) => (
          <tr key={header.name}>
            <th scope="row">
              <code>{header.name}</code>
            </th>
            <td>
              <code>{header.value}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
