import type { Locale } from "@/shared/i18n";
import { getPitfallsText } from "../text";
import { LikeButton } from "./LikeButton";
import styles from "./Pitfalls.module.css";

// Server Component: the text below never ships as JavaScript, only the
// small LikeButton does. (LEAF_PATTERN_SERVER_TEXT_5d1e)
export function ClientLeafCard({ locale }: { locale: Locale }) {
  const text = getPitfallsText(locale).leaf;

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.body}>LEAF_PATTERN_SERVER_TEXT_5d1e {text.body}</p>
      <LikeButton />
    </article>
  );
}
