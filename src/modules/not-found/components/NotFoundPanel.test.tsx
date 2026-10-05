import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LocaleProvider } from "@/shared/i18n";
import { NotFoundPanel } from "./NotFoundPanel";

afterEach(cleanup);

describe("NotFoundPanel", () => {
  it("shows the title, which file rendered it, and a way out", () => {
    render(
      <LocaleProvider locale="en">
        <NotFoundPanel variant="item" />
      </LocaleProvider>,
    );

    expect(screen.getByRole("heading", { name: "No such item" })).toBeDefined();
    expect(screen.getByText("Rendered by demo/[slug]/not-found.tsx (the segment's own).")).toBeDefined();
    expect(screen.getByRole("link", { name: "Back to all topics" }).getAttribute("href")).toBe("/en");
  });

  it("speaks Polish under the Polish locale", () => {
    render(
      <LocaleProvider locale="pl">
        <NotFoundPanel variant="item" />
      </LocaleProvider>,
    );

    expect(screen.getByText("Wyrenderowane przez demo/[slug]/not-found.tsx (własny segmentu).")).toBeDefined();
    expect(screen.getByRole("link", { name: "Wróć do wszystkich tematów" }).getAttribute("href")).toBe("/pl");
  });
});
