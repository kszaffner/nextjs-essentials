"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import type { PostMessageState } from "../postMessageState";
import { addMessage } from "./messageStore";

const SIMULATED_LATENCY_MS = 1000;
const MessageSchema = z.string().trim().min(1).max(60);

// With useActionState the action receives the previous state first, then the
// FormData. Expected failures are returned as state; they are not thrown.
// Public on purpose: it only appends to a capped in-memory demo list.
export async function postMessage(
  _previousState: PostMessageState,
  formData: FormData,
): Promise<PostMessageState> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));

  const parsed = MessageSchema.safeParse(formData.get("text"));
  if (!parsed.success) {
    return { status: "rejected", reason: "Write between 1 and 60 characters.", text: "" };
  }

  // A business rule the browser cannot know about, so the optimistic entry
  // has to be rolled back.
  if (parsed.data.toLowerCase() === "fail") {
    return { status: "rejected", reason: "The server rejected this message.", text: parsed.data };
  }

  addMessage(parsed.data);
  refresh();
  return { status: "posted", text: parsed.data };
}
