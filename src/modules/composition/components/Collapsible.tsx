"use client";

import { useState, type ReactNode } from "react";
import { useCompositionText } from "../text";
import styles from "./Composition.module.css";

type CollapsibleProps = {
  title: string;
  children: ReactNode;
};

// A Client Component with state that renders whatever it is given as
// `children`. The children were rendered on the server before this component
// ever ran, so toggling never re-runs them.
export function Collapsible({ title, children }: CollapsibleProps) {
  const text = useCompositionText();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      <button
        type="button"
        className={styles.button}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
      >
        {isOpen ? text.hide : text.show} {text.serverContent}
      </button>
      <div hidden={!isOpen}>{children}</div>
    </section>
  );
}
