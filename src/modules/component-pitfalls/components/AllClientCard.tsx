"use client";

import { useState } from "react";
import { usePitfallsText } from "../text";
import styles from "./Pitfalls.module.css";

// Pitfall: the directive sits on the whole card, so the static text is
// bundled as client JavaScript too. (ALL_CLIENT_TEXT_91c4)
export function AllClientCard() {
  const text = usePitfallsText();
  const [likes, setLikes] = useState(0);

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{text.allClient.title}</h3>
      <p className={styles.body}>ALL_CLIENT_TEXT_91c4 {text.allClient.body}</p>
      <button type="button" className={styles.button} onClick={() => setLikes((previousLikes) => previousLikes + 1)}>
        {text.like} ({likes})
      </button>
    </article>
  );
}
