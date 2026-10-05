"use client";

import { useState } from "react";
import { usePitfallsText } from "../text";
import styles from "./Pitfalls.module.css";

// The only interactive part, so the only part that needs "use client".
export function LikeButton() {
  const text = usePitfallsText();
  const [likes, setLikes] = useState(0);

  return (
    <button type="button" className={styles.button} onClick={() => setLikes((previousLikes) => previousLikes + 1)}>
      {text.like} ({likes})
    </button>
  );
}
