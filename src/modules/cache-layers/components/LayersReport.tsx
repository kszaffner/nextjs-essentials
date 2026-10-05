import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getCachedRun } from "../server/layerCounters";
import { getCacheLayersText } from "../text";
import { Layer } from "./Layer";
import styles from "./Layers.module.css";
import { MemoizedReader } from "./MemoizedReader";

// Per-request on purpose (connection()), so each fresh request, and each
// router refresh, runs the memoized loader once.
export async function LayersReport({ locale }: { locale: Locale }) {
  await connection();
  const text = getCacheLayersText(locale);
  const cachedRun = await getCachedRun();
  const renderedAt = new Date().toISOString();

  return (
    <ul className={styles.list}>
      <Layer title={text.memoization.title} hint={text.memoization.hint}>
        <MemoizedReader locale={locale} label={text.memoization.componentA} />
        <MemoizedReader locale={locale} label={text.memoization.componentB} />
      </Layer>
      <Layer title={text.serverCache.title} hint={text.serverCache.hint}>
        {text.serverCache.run} #{cachedRun.run}, {text.serverCache.generatedAt} {cachedRun.generatedAt}
      </Layer>
      <Layer title={text.routerCache.title} hint={text.routerCache.hint}>
        {text.routerCache.renderedAt} {renderedAt}
      </Layer>
    </ul>
  );
}
