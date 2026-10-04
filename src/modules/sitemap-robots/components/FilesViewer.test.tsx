import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FilesViewer } from "./FilesViewer";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("FilesViewer", () => {
  it("shows the status, content type, and body of the file", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("User-Agent: *\nAllow: /", { headers: { "content-type": "text/plain" } })),
    );
    render(<FilesViewer />);

    fireEvent.click(screen.getByRole("button", { name: "Fetch /robots.txt" }));

    const shown = (await screen.findByText(/GET \/robots.txt/)).textContent ?? "";
    expect(shown).toContain("content-type: text/plain");
    expect(shown).toContain("Allow: /");
  });

  it("truncates a long file and says how much was left out", async () => {
    const longBody = Array.from({ length: 30 }, (_, index) => `line ${index + 1}`).join("\n");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(longBody)));
    render(<FilesViewer />);

    fireEvent.click(screen.getByRole("button", { name: "Fetch /sitemap.xml" }));

    expect((await screen.findByText(/more lines/)).textContent).toContain("16 more lines");
  });

  it("reports a network failure instead of failing silently", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new Error("offline"))));
    render(<FilesViewer />);

    fireEvent.click(screen.getByRole("button", { name: "Fetch /sitemap.xml" }));

    expect((await screen.findByText(/Could not fetch/)).textContent).toContain("offline");
  });
});
