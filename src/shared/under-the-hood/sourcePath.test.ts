import { describe, expect, it } from "vitest";
import { resolveInsideSource } from "./sourcePath";

const ROOT = "/project";

describe("resolveInsideSource", () => {
  it("resolves a file under src", () => {
    expect(resolveInsideSource("src/app/[lang]/page.tsx", ROOT)).toBe("/project/src/app/[lang]/page.tsx");
  });

  it("refuses a path outside src", () => {
    expect(() => resolveInsideSource("package.json", ROOT)).toThrow(/under src/);
    expect(() => resolveInsideSource(".env", ROOT)).toThrow(/under src/);
  });

  it("refuses a traversal out of src", () => {
    expect(() => resolveInsideSource("src/../.env", ROOT)).toThrow(/under src/);
    expect(() => resolveInsideSource("src/../../etc/passwd", ROOT)).toThrow(/under src/);
  });

  it("refuses a sibling folder that merely starts with src", () => {
    expect(() => resolveInsideSource("src-other/file.ts", ROOT)).toThrow(/under src/);
  });
});
