import "server-only";
import { z } from "zod";

export const FETCH_DEMO_TAG = "fetch-extensions-demo";

const FORCE_CACHE = "force-cache";

const ClockReadingSchema = z.object({
  hits: z.number().int(),
  servedAt: z.string(),
});

export type ClockReading = z.infer<typeof ClockReadingSchema>;

type FetchOptions = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

export type FetchVariant = {
  id: string;
  label: string;
  options?: FetchOptions;
};

// Each variant gets its own URL (?variant=…): the cache key is the URL plus
// method, headers, and body, so variants never share an entry.
export const fetchVariants: readonly FetchVariant[] = [
  { id: "default", label: "no options (default)" },
  { id: "no-store", label: 'cache: "no-store"', options: { cache: "no-store" } },
  { id: "force-cache", label: 'cache: "force-cache"', options: { cache: FORCE_CACHE } },
  {
    id: "revalidate",
    label: "next: { revalidate: 10 }",
    options: { next: { revalidate: 10 } },
  },
  {
    id: "tags-only",
    label: `next: { tags: ["${FETCH_DEMO_TAG}"] } alone`,
    options: { next: { tags: [FETCH_DEMO_TAG] } },
  },
  {
    id: "force-cache-tags",
    label: `${FORCE_CACHE} + tags ["${FETCH_DEMO_TAG}"]`,
    options: { cache: FORCE_CACHE, next: { tags: [FETCH_DEMO_TAG] } },
  },
];

export async function loadClockReadings(origin: string) {
  const [variantReadings, memoizedPair] = await Promise.all([
    Promise.all(
      fetchVariants.map(async (variant) => ({
        variant,
        reading: await readClock(origin, variant.id, variant.options),
      })),
    ),
    // Two identical GETs in one render: memoization runs the request once.
    Promise.all([readClock(origin, "memo"), readClock(origin, "memo")]),
  ]);

  return { variantReadings, memoizedPair };
}

export async function readClock(
  origin: string,
  variantId: string,
  options?: FetchOptions,
): Promise<ClockReading> {
  const response = await fetch(
    `${origin}/api/fetch-extensions/clock?variant=${variantId}`,
    options,
  );
  if (!response.ok) {
    throw new Error(`Demo clock API answered ${response.status}`);
  }
  return ClockReadingSchema.parse(await response.json());
}
