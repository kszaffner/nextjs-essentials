import { describe, expect, it } from "vitest";
import { isKnownItemId, isPrerenderedBlogSlug } from "./demoData";

describe("demo data", () => {
  it("recognizes a prerendered blog slug and rejects others", () => {
    expect(isPrerenderedBlogSlug("hello-nextjs")).toBe(true);
    expect(isPrerenderedBlogSlug("surprise")).toBe(false);
  });

  it("recognizes a known item id and rejects others", () => {
    expect(isKnownItemId("1")).toBe(true);
    expect(isKnownItemId("99")).toBe(false);
  });
});
