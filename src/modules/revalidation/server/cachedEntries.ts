import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { readEntries } from "./entryStore";

export const ENTRIES_TAG = "revalidation-demo-entries";
export const ENTRIES_PATH = "/data/revalidation/demo";

// Cached for hours: it only changes when something invalidates the tag.
export async function getCachedEntries() {
  "use cache";
  cacheLife("hours");
  cacheTag(ENTRIES_TAG);

  return { entries: readEntries(), cachedAt: new Date().toISOString() };
}
