import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RuntimeProbe } from "./RuntimeProbe";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function stubFetch(handlerBody: unknown, proxyRuntime: string | null) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) =>
      url.startsWith("/api/")
        ? new Response(JSON.stringify(handlerBody))
        : new Response("<html></html>", {
            headers: proxyRuntime ? { "x-demo-runtime": proxyRuntime } : {},
          }),
    ),
  );
}

describe("RuntimeProbe", () => {
  it("shows where the route handler and the proxy ran", async () => {
    stubFetch({ runtime: "nodejs", nodeVersion: "v22.0.0", hasEdgeGlobal: false }, "nodejs");
    render(<RuntimeProbe />);

    fireEvent.click(screen.getByRole("button", { name: /Probe/ }));

    expect(await screen.findByText("Route Handler (/api/runtimes/info)")).toBeDefined();
    expect(screen.getAllByText("nodejs")).toHaveLength(2);
  });

  it("says so instead of failing silently when the response has the wrong shape", async () => {
    stubFetch({ unexpected: true }, "nodejs");
    render(<RuntimeProbe />);

    fireEvent.click(screen.getByRole("button", { name: /Probe/ }));

    expect((await screen.findByRole("alert")).textContent).toContain("Could not probe the server");
  });
});
