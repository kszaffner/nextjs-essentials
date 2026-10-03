import { DemoPanel } from "./DemoPanel";

type DemoPageProps = {
  title: string;
  description: string;
};

export function DemoPage({ title, description }: DemoPageProps) {
  return (
    <DemoPanel title={title}>
      <p>{description}</p>
    </DemoPanel>
  );
}
