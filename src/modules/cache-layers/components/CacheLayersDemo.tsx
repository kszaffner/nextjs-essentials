import { Suspense } from "react";
import { LayersReport } from "./LayersReport";
import { RefreshButton } from "./RefreshButton";
import styles from "./Layers.module.css";
import { LocalizedLink } from "@/shared/i18n";

export function CacheLayersDemo() {
  return (
    <div>
      <div className={styles.actions}>
        <LocalizedLink href="/data/cache-layers/demo/other">Open the other page</LocalizedLink>
        <RefreshButton />
      </div>
      <Suspense fallback={<p>Rendering on the server…</p>}>
        <LayersReport />
      </Suspense>
    </div>
  );
}
