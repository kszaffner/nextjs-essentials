import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Layer } from "./Layer";

afterEach(cleanup);

describe("Layer", () => {
  it("shows the layer name, its reading, and the hint", () => {
    render(
      <ul>
        <Layer title="Request memoization" hint="Runs once per render.">
          run #1
        </Layer>
      </ul>,
    );

    expect(screen.getByText("Request memoization")).toBeDefined();
    expect(screen.getByText("run #1")).toBeDefined();
    expect(screen.getByText("Runs once per render.")).toBeDefined();
  });
});
