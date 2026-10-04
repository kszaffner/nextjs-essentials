import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LocaleProvider } from "@/shared/i18n";
import { NotFoundPanel } from "./NotFoundPanel";

afterEach(cleanup);

describe("NotFoundPanel", () => {
  it("shows the title, which file rendered it, and a way out", () => {
    render(
      <LocaleProvider locale="en">
        <NotFoundPanel title="No such item" source="demo/not-found.tsx" />
      </LocaleProvider>,
    );

    expect(screen.getByRole("heading", { name: "No such item" })).toBeDefined();
    expect(screen.getByText("Rendered by demo/not-found.tsx.")).toBeDefined();
    expect(screen.getByRole("link", { name: "Back to all topics" }).getAttribute("href")).toBe("/en");
  });

  it("speaks Polish under the Polish locale", () => {
    render(
      <LocaleProvider locale="pl">
        <NotFoundPanel title="Brak elementu" source="demo/not-found.tsx" />
      </LocaleProvider>,
    );

    expect(screen.getByText("Wyrenderowane przez demo/not-found.tsx.")).toBeDefined();
    expect(screen.getByRole("link", { name: "Wróć do wszystkich tematów" }).getAttribute("href")).toBe("/pl");
  });
});
