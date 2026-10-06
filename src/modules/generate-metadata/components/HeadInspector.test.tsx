import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { HeadInspector } from "./HeadInspector";

beforeEach(() => {
  document.title = "Alpha";
  document.head.insertAdjacentHTML(
    "beforeend",
    '<meta name="description" content="A summary"><meta property="og:title" content="Alpha OG"><link rel="canonical" href="https://example.com/alpha">',
  );
});

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
});

describe("HeadInspector", () => {
  it("shows nothing until asked", () => {
    render(<HeadInspector locale="en" />);

    expect(screen.queryByRole("status")).toBeNull();
  });

  it("lists the title, description, canonical, and Open Graph tags", () => {
    render(<HeadInspector locale="en" />);

    fireEvent.click(screen.getByRole("button", { name: /head tags/ }));

    const shown = screen.getByRole("status").textContent ?? "";
    expect(shown).toContain("<title>Alpha</title>");
    expect(shown).toContain('content="A summary"');
    expect(shown).toContain('href="https://example.com/alpha"');
    expect(shown).toContain('content="Alpha OG"');
  });
});
