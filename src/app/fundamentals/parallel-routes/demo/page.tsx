import { SlotMessage } from "@/modules/parallel-routes";

export default function Page() {
  return (
    <SlotMessage
      slotName="children (demo/page.tsx)"
      title="Main"
      message="The implicit children slot."
    />
  );
}
