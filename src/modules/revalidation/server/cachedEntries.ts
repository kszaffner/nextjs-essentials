import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { readEntries } from "./entryStore";

export const ENTRIES_TAG = "revalidation-demo-entries";
// A route pattern, so one call refreshes the page in every language.
export const ENTRIES_PATH = "/[lang]/data/revalidation/demo";

// Cached for hours: it only changes when something invalidates the tag.
export async function getCachedEntries() {
  "use cache";
  cacheLife("hours");
  cacheTag(ENTRIES_TAG);

  return { entries: readEntries(), cachedAt: new Date().toISOString() };
}
