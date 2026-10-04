import { BackButton } from "./BackButton";
import styles from "./Layers.module.css";
import { LocalizedLink } from "@/shared/i18n";

export function CacheLayersOtherPage() {
  return (
    <div className={styles.actions}>
      <p>Another page. Go back two ways and compare the timestamp:</p>
      <LocalizedLink href="/data/cache-layers/demo">Link to the layers page (a new navigation)</LocalizedLink>
      <BackButton />
    </div>
  );
}
