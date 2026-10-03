import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PprPart } from "./PprPart";

afterEach(cleanup);

describe("PprPart", () => {
  it("shows the title, hint, and content", () => {
    render(
      <ul>
        <PprPart title="1. Static" hint="In the shell.">
          value
        </PprPart>
      </ul>,
    );

    expect(screen.getByText("1. Static")).toBeDefined();
    expect(screen.getByText("In the shell.")).toBeDefined();
    expect(screen.getByText("value")).toBeDefined();
  });

  it("renders a fallback part without content", () => {
    render(
      <ul>
        <PprPart title="3. (loading)" hint="Suspense fallback in the shell." />
      </ul>,
    );

    expect(screen.getByText("Suspense fallback in the shell.")).toBeDefined();
  });
});
