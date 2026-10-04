"use client";

import { useState } from "react";
import { useFileConventionsText } from "../text";
import { DemoPanel } from "./DemoPanel";
import styles from "./Demo.module.css";

export function CrashDemo() {
  const text = useFileConventionsText().crash;
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error(text.message);
  }

  return (
    <DemoPanel title={text.title}>
      <p>{text.body}</p>
      <button
        type="button"
        className={styles.button}
        onClick={() => setShouldCrash(true)}
      >
        {text.button}
      </button>
    </DemoPanel>
  );
}
