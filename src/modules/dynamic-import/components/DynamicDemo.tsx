"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ChunkReport } from "./ChunkReport";
import styles from "./Dynamic.module.css";

// ssr: false keeps the component out of the server render entirely, and
// is only allowed here, in a Client Component.
const LazyHeavyPanel = dynamic(() => import("./HeavyPanel").then((module) => module.HeavyPanel), {
  ssr: false,
  loading: () => <p role="status">Loading the heavy panel…</p>,
});

const EagerPanel = dynamic(() => import("./EagerDynamicPanel").then((module) => module.EagerDynamicPanel));

export function DynamicDemo() {
  const [openedAt, setOpenedAt] = useState<number | null>(null);

  return (
    <div>
      <EagerPanel />
      <section className={styles.section}>
        <h3 className={styles.title}>A dynamic import with ssr: false</h3>
        <button type="button" className={styles.button} onClick={() => setOpenedAt(performance.now())} disabled={openedAt !== null}>
          Open the heavy panel
        </button>
        <p className={styles.hint}>
          Nothing of the panel is in the first load: not its HTML and not its
          script. Opening it fetches the chunk.
        </p>
        {openedAt !== null ? <LazyHeavyPanel /> : null}
        <ChunkReport since={openedAt} />
      </section>
    </div>
  );
}
