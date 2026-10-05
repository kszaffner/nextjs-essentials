import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CodeBlock } from "./CodeBlock";

afterEach(cleanup);

describe("CodeBlock", () => {
  it("shows the code text", () => {
    const { container } = render(<CodeBlock code={'const answer = "42";'} />);

    expect(container.querySelector("code")?.textContent).toBe('const answer = "42";');
  });

  it("shows the title when one is given", () => {
    render(<CodeBlock code="const a = 1;" title="app/page.tsx" />);

    expect(screen.getByText("app/page.tsx")).toBeDefined();
  });

  it("escapes markup instead of rendering it", () => {
    const { container } = render(<CodeBlock code={"<script>alert(1)</script>"} />);

    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("code")?.textContent).toBe("<script>alert(1)</script>");
  });

  it("is reachable by keyboard so a long line can be scrolled", () => {
    const { container } = render(<CodeBlock code="const a = 1;" />);

    expect(container.querySelector("pre")?.getAttribute("tabindex")).toBe("0");
  });
});
