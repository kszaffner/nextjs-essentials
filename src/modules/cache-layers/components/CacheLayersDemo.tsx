import { Suspense } from "react";
import { LocalizedLink, type Locale } from "@/shared/i18n";
import { getCacheLayersText } from "../text";
import { LayersReport } from "./LayersReport";
import { RefreshButton } from "./RefreshButton";
import styles from "./Layers.module.css";

export function CacheLayersDemo({ locale }: { locale: Locale }) {
  const text = getCacheLayersText(locale);

  return (
    <div>
      <div className={styles.actions}>
        <LocalizedLink href="/data/cache-layers/demo/other">{text.openOther}</LocalizedLink>
        <RefreshButton />
      </div>
      <Suspense fallback={<p>{text.rendering}</p>}>
        <LayersReport locale={locale} />
      </Suspense>
    </div>
  );
}
