import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DemoErrorFallback } from "./DemoErrorFallback";

afterEach(cleanup);

describe("DemoErrorFallback", () => {
  it("shows the error message", () => {
    render(<DemoErrorFallback error={new Error("Boom")} retry={() => {}} />);

    expect(screen.getByRole("alert").textContent).toBe("Boom");
  });

  it("retries when the user asks to try again", () => {
    const retry = vi.fn();
    render(<DemoErrorFallback error={new Error("Boom")} retry={retry} />);

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });
});
