import "server-only";
import { cache } from "react";
import { cacheLife } from "next/cache";

let memoizedRuns = 0;
let cachedRuns = 0;

// Layer 1, request memoization: React.cache dedupes calls within one render
// pass. Two components calling this in the same request run it once.
export const loadMemoizedRun = cache(async () => {
  memoizedRuns += 1;
  return { run: memoizedRuns };
});

// Layer 2, the server-side data cache of the Cache Components model: the body
// only runs when there is no fresh cached result, whichever request asks.
export async function getCachedRun() {
  "use cache";
  cacheLife("hours");

  cachedRuns += 1;
  return { run: cachedRuns, generatedAt: new Date().toISOString() };
}
