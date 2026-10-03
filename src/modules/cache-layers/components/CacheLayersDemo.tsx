import Link from "next/link";
import { Suspense } from "react";
import { LayersReport } from "./LayersReport";
import { RefreshButton } from "./RefreshButton";
import styles from "./Layers.module.css";

export function CacheLayersDemo() {
  return (
    <div>
      <div className={styles.actions}>
        <Link href="/data/cache-layers/demo/other">Open the other page</Link>
        <RefreshButton />
      </div>
      <Suspense fallback={<p>Rendering on the server…</p>}>
        <LayersReport />
      </Suspense>
    </div>
  );
}
