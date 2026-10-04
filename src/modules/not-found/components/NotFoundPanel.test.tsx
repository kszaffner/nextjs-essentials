import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { NotFoundPanel } from "./NotFoundPanel";

afterEach(cleanup);

describe("NotFoundPanel", () => {
  it("shows the title, which file rendered it, and a way out", () => {
    render(<NotFoundPanel title="No such item" source="demo/not-found.tsx" />);

    expect(screen.getByRole("heading", { name: "No such item" })).toBeDefined();
    expect(screen.getByText("Rendered by demo/not-found.tsx.")).toBeDefined();
    expect(screen.getByRole("link", { name: "Back to all topics" }).getAttribute("href")).toBe("/");
  });
});
