"use client";

import { useState } from "react";
import { DemoPanel } from "./DemoPanel";
import styles from "./Demo.module.css";

export function CrashDemo() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Deliberate rendering error from the crash demo.");
  }

  return (
    <DemoPanel title="Crash page">
      <p>Rendering this component throws once you press the button.</p>
      <button
        type="button"
        className={styles.button}
        onClick={() => setShouldCrash(true)}
      >
        Throw a rendering error
      </button>
    </DemoPanel>
  );
}
