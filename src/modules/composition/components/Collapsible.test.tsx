import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LocaleProvider } from "@/shared/i18n";
import { Collapsible } from "./Collapsible";

afterEach(cleanup);

const CHILD_TEXT = "server content";

function renderCollapsible() {
  render(
    <LocaleProvider locale="en">
      <Collapsible title="Panel">
        <p>{CHILD_TEXT}</p>
      </Collapsible>
    </LocaleProvider>,
  );
}

function isChildHidden(): boolean {
  return screen.getByText(CHILD_TEXT).closest("div")?.hidden ?? false;
}

describe("Collapsible", () => {
  it("shows its children at first", () => {
    renderCollapsible();

    expect(isChildHidden()).toBe(false);
  });

  it("hides and shows the same children when toggled", () => {
    renderCollapsible();
    const toggle = screen.getByRole("button", { name: /server content/ });

    fireEvent.click(toggle);
    expect(isChildHidden()).toBe(true);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);
    expect(isChildHidden()).toBe(false);
  });
});
