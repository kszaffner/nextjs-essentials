import { DemoDestination } from "@/modules/proxy";

export default function Page() {
  return (
    <DemoDestination
      title="Redirect target (/new)"
      description="You were redirected here: the browser's URL changed."
    />
  );
}
