import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { FETCH_DEMO_TAG, fetchVariants, loadClockReadings, readClock } = await import("./clockClient");

const ORIGIN = "http://localhost:3000";
const FORCE_CACHE = "force-cache";
const SERVED_AT = "2026-01-01T00:00:00.000Z";

function stubFetch(responder: (url: string) => Response) {
  const fetchSpy = vi.fn(async (url: string) => responder(url));
  vi.stubGlobal("fetch", fetchSpy);
  return fetchSpy;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("readClock", () => {
  it("requests the variant's own URL with the options it was given", async () => {
    const fetchSpy = stubFetch(() => Response.json({ hits: 3, servedAt: SERVED_AT }));

    const reading = await readClock(ORIGIN, FORCE_CACHE, { cache: FORCE_CACHE });

    expect(fetchSpy).toHaveBeenCalledWith(`${ORIGIN}/api/fetch-extensions/clock?variant=${FORCE_CACHE}`, {
      cache: FORCE_CACHE,
    });
    expect(reading).toEqual({ hits: 3, servedAt: SERVED_AT });
  });

  it("throws when the API answers with an error status", async () => {
    stubFetch(() => new Response("nope", { status: 503 }));

    await expect(readClock(ORIGIN, "default")).rejects.toThrow("Demo clock API answered 503");
  });

  it("rejects a response with the wrong shape instead of trusting it", async () => {
    stubFetch(() => Response.json({ hits: "three" }));

    await expect(readClock(ORIGIN, "default")).rejects.toThrow();
  });
});

describe("fetchVariants", () => {
  it("has a unique id per variant, so no two share a cache entry", () => {
    const ids = fetchVariants.map((variant) => variant.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only the tagged variants carry the demo tag", () => {
    const tagged = fetchVariants.filter((variant) => variant.options?.next?.tags?.includes(FETCH_DEMO_TAG));

    expect(tagged.map((variant) => variant.id)).toEqual(["tags-only", "force-cache-tags"]);
  });
});

describe("loadClockReadings", () => {
  it("reads every variant plus the memoization pair", async () => {
    const fetchSpy = stubFetch(() => Response.json({ hits: 1, servedAt: SERVED_AT }));

    const result = await loadClockReadings(ORIGIN);

    expect(result.variantReadings).toHaveLength(fetchVariants.length);
    expect(result.memoizedPair).toHaveLength(2);
    expect(fetchSpy).toHaveBeenCalledTimes(fetchVariants.length + 2);
  });
});
