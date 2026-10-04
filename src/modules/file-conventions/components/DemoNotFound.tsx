"use client";

import { useFileConventionsText } from "../text";
import { DemoPanel } from "./DemoPanel";

export function DemoNotFound() {
  const text = useFileConventionsText().notFound;

  return (
    <DemoPanel title={text.title}>
      <p>{text.body}</p>
    </DemoPanel>
  );
}
