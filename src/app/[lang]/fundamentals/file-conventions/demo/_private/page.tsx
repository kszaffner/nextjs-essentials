import { DemoPage } from "@/modules/file-conventions";

// Never reachable: the underscore prefix opts this folder out of routing.
export default function Page() {
  return <DemoPage title="Private" description="You should not be able to see this." />;
}
