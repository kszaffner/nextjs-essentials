"use client";

import { useState } from "react";
import { messages, useLocale, useLocalizedPath } from "@/shared/i18n";
import styles from "./UnderTheHood.module.css";

type ResponseStreamProps = {
  // Internal page path without a language prefix, for example "/rendering/streaming/demo".
  path: string;
};

type Chunk = { atMilliseconds: number; bytes: number };

// Fetches a page and reads the body as it arrives, recording when each chunk
// lands: the first chunk is the static shell, later ones are streamed parts.
export function ResponseStream({ path }: ResponseStreamProps) {
  const text = messages[useLocale()].underTheHood;
  const localize = useLocalizedPath();
  const [chunks, setChunks] = useState<readonly Chunk[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  async function readStream() {
    setChunks([]);
    setFailure(null);
    setIsReading(true);
    const startedAt = performance.now();
    try {
      const response = await fetch(localize(path), { cache: "no-store" });
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("The response has no readable body.");
      }
      for (;;) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = { atMilliseconds: Math.round(performance.now() - startedAt), bytes: value.byteLength };
        setChunks((current) => [...current, chunk]);
      }
    } catch {
      // A failed request is something the visitor can retry, so say so.
      setFailure(text.fetchFailed);
    } finally {
      setIsReading(false);
    }
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={readStream} disabled={isReading}>
        {text.streamButton}
      </button>
      {failure ? <p role="alert">{failure}</p> : null}
      {chunks.length === 0 ? null : <ChunkTable chunks={chunks} />}
    </div>
  );
}

function ChunkTable({ chunks }: { chunks: readonly Chunk[] }) {
  const text = messages[useLocale()].underTheHood;

  return (
    <table className={styles.table} role="status" aria-live="polite">
      <thead>
        <tr>
          <th scope="col">{text.columns.chunk}</th>
          <th scope="col">{text.columns.time}</th>
          <th scope="col">{text.columns.size}</th>
        </tr>
      </thead>
      <tbody>
        {chunks.map((chunk, index) => (
          <tr key={`${chunk.atMilliseconds}-${index}`}>
            <td>{index === 0 ? text.shellChunk : `#${index + 1}`}</td>
            <td>{chunk.atMilliseconds} ms</td>
            <td>{chunk.bytes} B</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
