"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useDynamicImportText } from "../text";
import styles from "./Dynamic.module.css";

// ssr: false keeps the component out of the server render entirely, and
// is only allowed here, in a Client Component.
const LazyHeavyPanel = dynamic(() => import("./HeavyPanel").then((module) => module.HeavyPanel), {
  ssr: false,
  loading: () => <LoadingNote />,
});

const EagerPanel = dynamic(() => import("./EagerDynamicPanel").then((module) => module.EagerDynamicPanel));

function LoadingNote() {
  return <p role="status">{useDynamicImportText().lazy.loading}</p>;
}

export function DynamicDemo() {
  const text = useDynamicImportText().lazy;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <EagerPanel />
      <section className={styles.section}>
        <h3 className={styles.title}>{text.title}</h3>
        <button type="button" className={styles.button} onClick={() => setIsOpen(true)} disabled={isOpen}>
          {text.button}
        </button>
        <p className={styles.hint}>{text.hint}</p>
        {isOpen ? <LazyHeavyPanel /> : null}
      </section>
    </div>
  );
}
