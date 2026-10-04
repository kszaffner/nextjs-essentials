"use client";

import { useFileConventionsText } from "../text";
import styles from "./Demo.module.css";

type PersistenceProbeProps = {
  kind: "layout" | "template";
};

// An uncontrolled input: whatever the user types lives in the DOM, so it
// survives navigation only if the component around it is not remounted.
// A Client Component because template.tsx receives no params to read the
// language from; it takes it from the layout's context instead.
export function PersistenceProbe({ kind }: PersistenceProbeProps) {
  const text = useFileConventionsText();

  return (
    <label className={styles.field}>
      {kind === "layout" ? text.layoutProbe : text.templateProbe}
      <input className={styles.input} type="text" placeholder={text.probePlaceholder} />
    </label>
  );
}
