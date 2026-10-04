import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/shared/i18n";
import { DemoErrorFallback } from "./DemoErrorFallback";

afterEach(cleanup);

describe("DemoErrorFallback", () => {
  it("shows the error message", () => {
    render(
      <LocaleProvider locale="en">
        <DemoErrorFallback error={new Error("Boom")} retry={() => {}} />
      </LocaleProvider>,
    );

    expect(screen.getByRole("alert").textContent).toBe("Boom");
  });

  it("retries when the user asks to try again", () => {
    const retry = vi.fn();
    render(
      <LocaleProvider locale="en">
        <DemoErrorFallback error={new Error("Boom")} retry={retry} />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("speaks Polish under the Polish locale", () => {
    render(
      <LocaleProvider locale="pl">
        <DemoErrorFallback error={new Error("Boom")} retry={() => {}} />
      </LocaleProvider>,
    );

    expect(screen.getByRole("button", { name: "Spróbuj ponownie" })).toBeDefined();
  });
});
