import { cacheLife, cacheTag } from "next/cache";

export const PPR_CACHE_TAG = "ppr-demo-hourly";

// Long enough to be prerendered into the static shell.
export async function getHourlyFacts() {
  "use cache";
  cacheLife("hours");
  cacheTag(PPR_CACHE_TAG);

  return { generatedAt: new Date().toISOString() };
}

// "seconds" has an expire of one minute, under the five-minute threshold, so
// Next.js leaves it out of the prerender and resolves it at request time.
export async function getSecondsFacts() {
  "use cache";
  cacheLife("seconds");

  return { generatedAt: new Date().toISOString() };
}
