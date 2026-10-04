import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OgInspector } from "./OgInspector";

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
});

describe("OgInspector", () => {
  it("shows the image tags that are set", () => {
    document.head.insertAdjacentHTML(
      "beforeend",
      '<meta property="og:image" content="https://example.com/og.png"><meta property="og:image:width" content="1200">',
    );
    render(<OgInspector />);

    fireEvent.click(screen.getByRole("button"));

    const shown = screen.getByRole("status").textContent ?? "";
    expect(shown).toContain("og:image: https://example.com/og.png");
    expect(shown).toContain("og:image:width: 1200");
  });

  it("says plainly which tags are missing", () => {
    render(<OgInspector />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("status").textContent).toContain("og:image: (not set)");
  });
});
