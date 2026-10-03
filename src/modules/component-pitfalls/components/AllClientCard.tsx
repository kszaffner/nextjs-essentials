"use client";

import { useState } from "react";
import styles from "./Pitfalls.module.css";

// Pitfall: the directive sits on the whole card, so the static text is
// bundled as client JavaScript too. (ALL_CLIENT_TEXT_91c4)
export function AllClientCard() {
  const [likes, setLikes] = useState(0);

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>Pitfall: everything is client</h3>
      <p className={styles.body}>ALL_CLIENT_TEXT_91c4 ships in the client bundle.</p>
      <button type="button" className={styles.button} onClick={() => setLikes((previousLikes) => previousLikes + 1)}>
        Like ({likes})
      </button>
    </article>
  );
}
