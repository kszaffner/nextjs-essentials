import { describe, expect, it } from "vitest";
import { findOgDemoItem, ogDemoItems } from "./ogDemoData";

describe("findOgDemoItem", () => {
  it("finds every listed item by slug", () => {
    for (const item of ogDemoItems) {
      expect(findOgDemoItem(item.slug)).toEqual(item);
    }
  });

  it("returns undefined for an unknown slug", () => {
    expect(findOgDemoItem("nothing-here")).toBeUndefined();
  });
});
