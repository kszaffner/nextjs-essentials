import { describe, expect, it } from "vitest";
import { isKnownSlug, knownSlugs } from "./knownSlugs";

describe("isKnownSlug", () => {
  it("recognizes every known slug", () => {
    for (const slug of knownSlugs) {
      expect(isKnownSlug(slug)).toBe(true);
    }
  });

  it("rejects anything else, including near misses", () => {
    expect(isKnownSlug("nothing-here")).toBe(false);
    expect(isKnownSlug("Alpha")).toBe(false);
    expect(isKnownSlug("")).toBe(false);
  });
});
