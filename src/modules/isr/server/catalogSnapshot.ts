import { cacheLife, cacheTag } from "next/cache";

export const CATALOG_TAG = "isr-demo-catalog";

// Stands in for a slow, shared data source (a CMS, a catalog API). The cached
// result is regenerated in the background at most every REVALIDATE seconds.
export async function getCatalogSnapshot() {
  "use cache";
  // stale: how long a client may reuse the result without asking the server.
  // revalidate: after this, the next request still gets the old result and
  //   triggers a background regeneration (stale-while-revalidate).
  // expire: after this with no traffic, the next request waits for fresh data.
  cacheLife({ stale: 300, revalidate: 10, expire: 600 });
  cacheTag(CATALOG_TAG);

  return { generatedAt: new Date().toISOString() };
}
