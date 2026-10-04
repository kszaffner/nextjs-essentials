import { DemoPage } from "@/modules/file-conventions";

// Never reachable: the underscore prefix opts this folder out of routing.
export default function Page() {
  return <DemoPage page="privateFolder" />;
}
