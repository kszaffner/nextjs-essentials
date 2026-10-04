import { SlotMessage } from "@/modules/parallel-routes";

export default function Loading() {
  return (
    <SlotMessage
      slotName="@analytics/loading.tsx"
      title="Analytics (loading)"
      message="This slot has its own loading state."
    />
  );
}
