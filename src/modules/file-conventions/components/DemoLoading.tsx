"use client";

import { useFileConventionsText } from "../text";
import { DemoPanel } from "./DemoPanel";

// loading.tsx receives no props, so the language comes from the context.
export function DemoLoading() {
  const text = useFileConventionsText().loading;

  return (
    <DemoPanel title={text.title}>
      <p role="status">{text.body}</p>
    </DemoPanel>
  );
}
