import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { testedUnits } from "./testedUnits";

describe("testedUnits", () => {
  it("only points at test files that exist", () => {
    const missing = testedUnits.filter((unit) => !existsSync(path.join(process.cwd(), unit.testFile)));

    expect(missing).toEqual([]);
  });

  it("lists every file once", () => {
    const files = testedUnits.map((unit) => unit.testFile);

    expect(new Set(files).size).toBe(files.length);
  });

  it("only lists test files", () => {
    expect(testedUnits.every((unit) => /\.test\.tsx?$/.test(unit.testFile))).toBe(true);
  });
});
