import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ReadingsTable } from "./ReadingsTable";

afterEach(cleanup);

const reading = (hits: number) => ({ hits, servedAt: `2026-01-01T00:00:0${hits}.000Z` });

describe("ReadingsTable", () => {
  it("shows the hit count and time for each fetch variant", () => {
    render(
      <ReadingsTable
        variantReadings={[
          { variant: { id: "default", label: "no options (default)" }, reading: reading(1) },
          { variant: { id: "force-cache", label: "force-cache" }, reading: reading(5) },
        ]}
        memoizedPair={[reading(7), reading(7)]}
      />,
    );

    const cachedRow = screen.getByRole("row", { name: /^force-cache/ });
    expect(within(cachedRow).getByText("5")).toBeDefined();
    expect(within(cachedRow).getByText("2026-01-01T00:00:05.000Z")).toBeDefined();
  });

  it("shows both memoized hit counts so a shared result is visible", () => {
    render(<ReadingsTable variantReadings={[]} memoizedPair={[reading(7), reading(7)]} />);

    const memoizedRow = screen.getByRole("row", { name: /same URL twice/ });
    expect(within(memoizedRow).getByText("7 and 7")).toBeDefined();
  });
});
