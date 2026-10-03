import Link from "next/link";
import { BackButton } from "./BackButton";
import styles from "./Layers.module.css";

export function CacheLayersOtherPage() {
  return (
    <div className={styles.actions}>
      <p>Another page. Go back two ways and compare the timestamp:</p>
      <Link href="/data/cache-layers/demo">Link to the layers page (a new navigation)</Link>
      <BackButton />
    </div>
  );
}
