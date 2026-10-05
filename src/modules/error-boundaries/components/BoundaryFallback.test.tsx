import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/shared/i18n";
import { BoundaryFallback } from "./BoundaryFallback";

afterEach(cleanup);

function renderFallback(error: Error & { digest?: string }, retry = () => {}) {
  render(
    <LocaleProvider locale="en">
      <BoundaryFallback boundary="parent" error={error} retry={retry} />
    </LocaleProvider>,
  );
}

describe("BoundaryFallback", () => {
  it("names the boundary that caught the error", () => {
    renderFallback(new Error("x"));

    expect(screen.getByText("Caught by demo/error.tsx (the parent boundary)")).toBeDefined();
  });

  it("shows only the message the browser received, plus the digest", () => {
    renderFallback(Object.assign(new Error("masked"), { digest: "123" }));

    expect(screen.getByRole("alert").textContent).toContain("masked");
    expect(screen.getByText("digest: 123")).toBeDefined();
  });

  it("says so when there is no digest", () => {
    renderFallback(new Error("x"));

    expect(screen.getByText("digest: (none)")).toBeDefined();
  });

  it("retries when asked", () => {
    const retry = vi.fn();
    renderFallback(new Error("x"), retry);

    fireEvent.click(screen.getByRole("button", { name: "retry()" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });
});
