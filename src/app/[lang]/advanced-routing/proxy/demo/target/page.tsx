import { DemoDestination } from "@/modules/proxy";

export default function Page() {
  return (
    <DemoDestination
      title="Rewrite target (/target)"
      description="You opened /alias; the proxy rewrote it here and the URL did not change."
    />
  );
}
