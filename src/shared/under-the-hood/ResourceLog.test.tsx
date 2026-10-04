import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/shared/i18n";
import { ResourceLog } from "./ResourceLog";

type Callback = (list: { getEntries: () => PerformanceResourceTiming[] }) => void;

let deliver: Callback | undefined;

function entry(name: string, startTime: number, transferSize = 1200): PerformanceResourceTiming {
  return { name, startTime, transferSize, initiatorType: "script" } as PerformanceResourceTiming;
}

beforeEach(() => {
  deliver = undefined;

  vi.stubGlobal(
    "PerformanceObserver",
    class {
      constructor(callback: Callback) {
        deliver = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function renderLog() {
  render(
    <LocaleProvider locale="en">
      <ResourceLog urlIncludes="/_next/static/chunks/" />
    </LocaleProvider>,
  );
}

describe("ResourceLog", () => {
  it("lists only requests that match, by file name", () => {
    renderLog();

    act(() =>
      deliver?.({
        getEntries: () => [
          entry("http://x/_next/static/chunks/a.js", 10),
          entry("http://x/api/other", 20),
        ],
      }),
    );

    expect(screen.getByText("a.js")).toBeDefined();
    expect(screen.queryByText(/api\/other/)).toBeNull();
  });

  it("empties the list on Clear and shows only what is requested afterwards", () => {
    renderLog();

    act(() => deliver?.({ getEntries: () => [entry("http://x/_next/static/chunks/early.js", 5)] }));
    fireEvent.click(screen.getByRole("button", { name: "Clear the list" }));

    expect(screen.queryByText("early.js")).toBeNull();

    act(() =>
      deliver?.({ getEntries: () => [entry("http://x/_next/static/chunks/late.js", performance.now() + 5000)] }),
    );

    expect(screen.getByText("late.js")).toBeDefined();
  });

  it("says cached when nothing was transferred", () => {
    renderLog();

    act(() => deliver?.({ getEntries: () => [entry("http://x/_next/static/chunks/c.js", 1, 0)] }));

    expect(screen.getByText("cached")).toBeDefined();
  });
});
