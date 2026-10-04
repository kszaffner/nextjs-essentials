import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
// cacheLife() and cacheTag() only work inside a real cache scope. Replacing
// them lets the function body run as ordinary code, and lets the test check
// what it asked the cache for.
const cacheLife = vi.fn();
const cacheTag = vi.fn();
vi.mock("next/cache", () => ({ cacheLife, cacheTag }));

const { ENTRIES_TAG, getCachedEntries } = await import("./cachedEntries");
const { addEntry, resetEntries } = await import("./entryStore");

beforeEach(() => {
  resetEntries();
  cacheLife.mockClear();
  cacheTag.mockClear();
});

describe("getCachedEntries", () => {
  it("returns the current entries with a timestamp", async () => {
    addEntry();

    const result = await getCachedEntries();

    expect(result.entries).toEqual(["Entry #1"]);
    expect(Date.parse(result.cachedAt)).not.toBeNaN();
  });

  it("tags its result so revalidateTag can invalidate it", async () => {
    await getCachedEntries();

    expect(cacheTag).toHaveBeenCalledWith(ENTRIES_TAG);
  });

  it("asks for the hours lifetime profile", async () => {
    await getCachedEntries();

    expect(cacheLife).toHaveBeenCalledWith("hours");
  });
});
