import { LikeButton } from "./LikeButton";
import styles from "./Pitfalls.module.css";

// Server Component: the text below never ships as JavaScript, only the
// small LikeButton does. (LEAF_PATTERN_SERVER_TEXT_5d1e)
export function ClientLeafCard() {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>Good: a client leaf</h3>
      <p className={styles.body}>LEAF_PATTERN_SERVER_TEXT_5d1e is rendered on the server.</p>
      <LikeButton />
    </article>
  );
}
