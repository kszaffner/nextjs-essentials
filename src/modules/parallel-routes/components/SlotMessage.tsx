"use client";

import { type SlotKey, useParallelRoutesText } from "../text";
import { SlotPanel } from "./SlotPanel";

// A Client Component because loading.tsx and default.tsx receive no props:
// the language comes from the layout's context.
export function SlotMessage({ slot }: { slot: SlotKey }) {
  const { slotName, title, message } = useParallelRoutesText().slots[slot];

  return (
    <SlotPanel slotName={slotName} title={title}>
      <p>{message}</p>
    </SlotPanel>
  );
}
