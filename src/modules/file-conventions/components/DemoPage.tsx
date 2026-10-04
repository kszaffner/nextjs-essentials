"use client";

import { useFileConventionsText } from "../text";
import { DemoPanel } from "./DemoPanel";

type DemoPageProps = {
  page: "home" | "second" | "about" | "privateFolder";
};

export function DemoPage({ page }: DemoPageProps) {
  const { title, description } = useFileConventionsText().pages[page];

  return (
    <DemoPanel title={title}>
      <p>{description}</p>
    </DemoPanel>
  );
}
