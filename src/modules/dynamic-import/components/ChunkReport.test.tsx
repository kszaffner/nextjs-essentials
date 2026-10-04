import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChunkReport } from "./ChunkReport";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function stubScripts(entries: { name: string; startTime: number }[]) {
  vi.spyOn(performance, "getEntriesByType").mockReturnValue(
    entries.map((entry) => ({ ...entry, entryType: "resource" }) as PerformanceResourceTiming),
  );
}

describe("ChunkReport", () => {
  it("asks you to open the panel first when it has not been opened", () => {
    stubScripts([{ name: "http://x/_next/static/chunks/a.js", startTime: 10 }]);
    render(<ChunkReport since={null} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("status").textContent).toContain("open the heavy panel first");
  });

  it("lists only the scripts that started loading after the panel was opened", () => {
    stubScripts([
      { name: "http://x/_next/static/chunks/old.js", startTime: 10 },
      { name: "http://x/_next/static/chunks/new.js", startTime: 500 },
      { name: "http://x/_next/static/media/font.woff2", startTime: 600 },
    ]);
    render(<ChunkReport since={100} />);

    fireEvent.click(screen.getByRole("button"));

    const shown = screen.getByRole("status").textContent ?? "";
    expect(shown).toContain("script chunks loaded so far: 2");
    expect(shown).toContain("loaded after you opened the panel: 1");
    expect(shown).toContain("new.js");
    expect(shown).not.toContain("old.js\n");
  });
});
