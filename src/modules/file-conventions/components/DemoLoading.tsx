import { DemoPanel } from "./DemoPanel";

export function DemoLoading() {
  return (
    <DemoPanel title="Loading…">
      <p role="status">This is loading.tsx, shown while the page streams in.</p>
    </DemoPanel>
  );
}
