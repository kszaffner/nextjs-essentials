import { SlotMessage } from "@/modules/parallel-routes";

export default function Default() {
  return (
    <SlotMessage
      slotName="@analytics/default.tsx"
      title="Analytics fallback"
      message="This slot has no settings page, so after a full page load on /demo/settings it renders default.tsx."
    />
  );
}
