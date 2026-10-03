import { SlotMessage } from "@/modules/parallel-routes";

export default function Page() {
  return (
    <SlotMessage
      slotName="@team/settings/page.tsx"
      title="Team settings"
      message="Only the team slot has a settings page."
    />
  );
}
