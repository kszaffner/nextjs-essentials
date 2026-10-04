import { afterEach, describe, expect, it, vi } from "vitest";

const captureException = vi.fn();

vi.mock("@sentry/nextjs", () => ({
  captureException: (...args: unknown[]) => captureException(...args),
}));

const { reportUnexpectedError } = await import("./reportUnexpectedError");

afterEach(() => {
  captureException.mockReset();
  vi.restoreAllMocks();
});

describe("reportUnexpectedError", () => {
  it("sends the error with the operation and extra tags", () => {
    const error = new Error("boom");

    reportUnexpectedError(error, { operation: "route-handler:risky", tags: { demo: "true" } });

    expect(captureException).toHaveBeenCalledWith(error, {
      tags: { operation: "route-handler:risky", demo: "true" },
    });
  });

  it("never throws, even when the monitoring service fails", () => {
    captureException.mockImplementation(() => {
      throw new Error("monitor down");
    });
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => reportUnexpectedError(new Error("boom"), { operation: "x" })).not.toThrow();
    expect(logged).toHaveBeenCalled();
  });
});
