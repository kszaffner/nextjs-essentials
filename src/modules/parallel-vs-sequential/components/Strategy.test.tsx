import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Strategy } from "./Strategy";

afterEach(cleanup);

describe("Strategy", () => {
  it("shows the strategy name, its measured result, and the explanation", () => {
    render(
      <ul>
        <Strategy title="Promise.all" hint="The slowest request decides.">
          took 601 ms
        </Strategy>
      </ul>,
    );

    expect(screen.getByText("Promise.all")).toBeDefined();
    expect(screen.getByText("took 601 ms")).toBeDefined();
    expect(screen.getByText("The slowest request decides.")).toBeDefined();
  });
});
