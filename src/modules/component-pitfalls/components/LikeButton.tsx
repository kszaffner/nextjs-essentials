"use client";

import { useState } from "react";
import styles from "./Pitfalls.module.css";

// The only interactive part, so the only part that needs "use client".
export function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button type="button" className={styles.button} onClick={() => setLikes((previousLikes) => previousLikes + 1)}>
      Like ({likes})
    </button>
  );
}
