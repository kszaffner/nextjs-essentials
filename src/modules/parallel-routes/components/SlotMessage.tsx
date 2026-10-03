import { SlotPanel } from "./SlotPanel";

type SlotMessageProps = {
  slotName: string;
  title: string;
  message: string;
};

export function SlotMessage({ slotName, title, message }: SlotMessageProps) {
  return (
    <SlotPanel slotName={slotName} title={title}>
      <p>{message}</p>
    </SlotPanel>
  );
}
