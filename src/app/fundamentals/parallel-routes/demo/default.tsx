import { SlotMessage } from "@/modules/parallel-routes";

export default function Default() {
  return (
    <SlotMessage
      slotName="children (demo/default.tsx)"
      title="Main fallback"
      message="Shown after a full page load on a URL where only some slots match."
    />
  );
}
