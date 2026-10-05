import { LocalizedLink, type Locale } from "@/shared/i18n";
import { getCacheLayersText } from "../text";
import { BackButton } from "./BackButton";
import styles from "./Layers.module.css";

export function CacheLayersOtherPage({ locale }: { locale: Locale }) {
  const text = getCacheLayersText(locale);

  return (
    <div className={styles.actions}>
      <p>{text.otherIntro}</p>
      <LocalizedLink href="/data/cache-layers/demo">{text.otherLink}</LocalizedLink>
      <BackButton />
    </div>
  );
}
