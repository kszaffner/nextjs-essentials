import { DemoPanel } from "./DemoPanel";

export function DemoNotFound() {
  return (
    <DemoPanel title="This is not-found.tsx">
      <p>The page called notFound(), so the closest not-found.tsx rendered.</p>
    </DemoPanel>
  );
}
