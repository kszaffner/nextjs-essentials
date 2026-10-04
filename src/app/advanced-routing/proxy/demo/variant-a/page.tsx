import { DemoDestination } from "@/modules/proxy";

export default function Page() {
  return (
    <DemoDestination
      title="Variant A"
      description="The proxy rewrote /personalized to this page for variant A."
    />
  );
}
