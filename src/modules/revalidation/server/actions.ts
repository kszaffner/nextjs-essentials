"use server";

import { refresh, revalidatePath, revalidateTag, updateTag } from "next/cache";
import { ENTRIES_PATH, ENTRIES_TAG } from "./cachedEntries";
import { addEntry, resetEntries } from "./entryStore";

// All of these are public on purpose: they take no input, and each touches
// only the in-memory demo list (capped at a few entries). A real mutation
// would authorize the caller here, inside the action.

// Read-your-own-writes: the next render waits for fresh data.
export async function addWithUpdateTag() {
  addEntry();
  updateTag(ENTRIES_TAG);
}

// Stale-while-revalidate: the next render may still show the old list.
export async function addWithRevalidateTag() {
  addEntry();
  revalidateTag(ENTRIES_TAG, "max");
}

// Invalidates by path instead of by tag.
export async function addWithRevalidatePath() {
  addEntry();
  revalidatePath(ENTRIES_PATH, "page");
}

// Refreshes the client router only: it does not invalidate any cache.
export async function addWithRefresh() {
  addEntry();
  refresh();
}

export async function clearEntries() {
  resetEntries();
  updateTag(ENTRIES_TAG);
}
