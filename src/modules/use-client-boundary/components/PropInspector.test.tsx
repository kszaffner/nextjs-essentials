import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PropInspector } from "./PropInspector";

afterEach(cleanup);

describe("PropInspector", () => {
  it("shows the type and value of each received prop", () => {
    render(
      <PropInspector
        sentKeys={["date", "count"]}
        values={{ date: new Date("2026-01-01T00:00:00Z"), count: 42 }}
      />,
    );

    const dateRow = screen.getByRole("row", { name: /^date/ });
    expect(within(dateRow).getByText("Date")).toBeDefined();
    expect(within(dateRow).getByText("2026-01-01T00:00:00.000Z")).toBeDefined();
    const countRow = screen.getByRole("row", { name: /^count/ });
    expect(within(countRow).getByText("number")).toBeDefined();
  });

  it("flags a key that was sent but did not arrive", () => {
    render(<PropInspector sentKeys={["nothing"]} values={{}} />);

    expect(screen.getByText(/the key itself is gone/)).toBeDefined();
  });
});
