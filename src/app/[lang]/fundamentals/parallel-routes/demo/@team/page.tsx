import { SlotMessage } from "@/modules/parallel-routes";

export default function Page() {
  return (
    <SlotMessage
      slotName="@team/page.tsx"
      title="Team"
      message="The team slot at /demo."
    />
  );
}
