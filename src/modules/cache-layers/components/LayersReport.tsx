import { connection } from "next/server";
import { getCachedRun } from "../server/layerCounters";
import { Layer } from "./Layer";
import styles from "./Layers.module.css";
import { MemoizedReader } from "./MemoizedReader";

// Per-request on purpose (connection()), so each fresh request, and each
// router refresh, runs the memoized loader once.
export async function LayersReport() {
  await connection();
  const cachedRun = await getCachedRun();
  const renderedAt = new Date().toISOString();

  return (
    <ul className={styles.list}>
      <Layer
        title="Request memoization (React.cache)"
        hint="Two components asked for the same data in one render; the loader ran once, so both saw the same run. The number grows by one per request."
      >
        <MemoizedReader label="Component A" />
        <MemoizedReader label="Component B" />
      </Layer>
      <Layer
        title='Server cache ("use cache" + cacheLife("hours"))'
        hint="The function body ran for run #N only when nothing fresh was cached. Reloading does not move it."
      >
        run #{cachedRun.run}, generated at {cachedRun.generatedAt}
      </Layer>
      <Layer
        title="Client router cache"
        hint="Open the other page, then return two ways. A Link is a new navigation: the page renders on the server again and this timestamp changes. router.back() or the browser back button restores the page you left, with the same timestamp, because visited routes are kept instead of re-rendered. A reload or router.refresh() changes it."
      >
        this page rendered at {renderedAt}
      </Layer>
    </ul>
  );
}
