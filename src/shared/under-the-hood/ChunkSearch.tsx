"use client";

import { useState } from "react";
import { messages, useLocale } from "@/shared/i18n";
import styles from "./UnderTheHood.module.css";

type ChunkSearchProps = {
  // The text to look for inside every JavaScript chunk this page loaded.
  needle: string;
};

type SearchResult = { searched: number; foundIn: readonly string[] };

function loadedChunkUrls(): string[] {
  // A Set, because searching fetches the chunks again and adds timeline entries.
  const urls = performance
    .getEntriesByType("resource")
    .map((entry) => entry.name)
    .filter((url) => url.includes("/_next/static/") && url.split("?")[0]?.endsWith(".js"));
  return [...new Set(urls)];
}

// Downloads the page's client chunks and greps them: the direct way to prove
// that code or a value is (or is not) shipped to the browser.
export function ChunkSearch({ needle }: ChunkSearchProps) {
  const text = messages[useLocale()].underTheHood;
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  async function search() {
    setFailure(null);
    setIsSearching(true);
    try {
      const urls = loadedChunkUrls();
      const contents = await Promise.all(
        urls.map(async (url) => ({ url, body: await (await fetch(url)).text() })),
      );
      const foundIn = contents
        .filter(({ body }) => body.includes(needle))
        .map(({ url }) => new URL(url).pathname.split("/").at(-1) ?? url);
      setResult({ searched: urls.length, foundIn });
    } catch {
      // A failed request is something the visitor can retry, so say so.
      setFailure(text.fetchFailed);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div>
      <p>
        <code>{needle}</code>
      </p>
      <button type="button" className={styles.button} onClick={search} disabled={isSearching}>
        {text.searchChunks}
      </button>
      {failure ? <p role="alert">{failure}</p> : null}
      {result ? <p role="status">{text.searchResult(result.searched, result.foundIn)}</p> : null}
    </div>
  );
}
