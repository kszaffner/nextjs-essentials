import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/shared/i18n";
import { ChunkSearch } from "./ChunkSearch";
import { ResponseHeaders } from "./ResponseHeaders";
import { ResponseStream } from "./ResponseStream";
import { RscPayload } from "./RscPayload";

const CHUNK_A_URL = "http://x/_next/static/chunks/a.js";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function inEnglish(element: React.ReactNode) {
  return render(<LocaleProvider locale="en">{element}</LocaleProvider>);
}

function stubFetch(handler: (url: string, init?: RequestInit) => Response) {
  const fetchSpy = vi.fn(async (url: string, init?: RequestInit) => handler(url, init));
  vi.stubGlobal("fetch", fetchSpy);
  return fetchSpy;
}

describe("ResponseHeaders", () => {
  it("fetches the localized page and shows the chosen headers, marking absent ones", async () => {
    const fetchSpy = stubFetch(
      () => new Response("", { status: 200, headers: { "cache-control": "s-maxage=60" } }),
    );
    inEnglish(<ResponseHeaders paths={["/rendering/isr/demo"]} headerNames={["cache-control", "x-nextjs-postponed"]} />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByText("s-maxage=60")).toBeDefined());
    expect(fetchSpy).toHaveBeenCalledWith("/en/rendering/isr/demo", { cache: "no-store" });
    expect(screen.getByText("(absent)")).toBeDefined();
  });

  it("says so when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    inEnglish(<ResponseHeaders paths={["/x"]} headerNames={["cache-control"]} />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByRole("alert")).toBeDefined());
  });
});

describe("ResponseStream", () => {
  it("lists every chunk of the body, the first one as the shell", async () => {
    const encoder = new TextEncoder();
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode("shell"));
        controller.enqueue(encoder.encode("late part"));
        controller.close();
      },
    });
    stubFetch(() => new Response(body));
    inEnglish(<ResponseStream path="/rendering/streaming/demo" />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByText("#1 (shell)")).toBeDefined());
    expect(screen.getByText("#2")).toBeDefined();
    expect(screen.getByText("9 B")).toBeDefined();
  });
});

describe("RscPayload", () => {
  it("asks for the RSC payload and shows only the matching lines", async () => {
    const fetchSpy = stubFetch(() => new Response("0:ignored\n1:{\"sentKeys\":[\"a\"]}\n2:other"));
    inEnglish(<RscPayload path="/components/x" lineIncludes="sentKeys" />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByRole("status").textContent).toBe('1:{"sentKeys":["a"]}'));
    expect(fetchSpy).toHaveBeenCalledWith("/en/components/x", { headers: { RSC: "1" }, cache: "no-store" });
  });

  it("says when no line matches", async () => {
    stubFetch(() => new Response("0:nothing"));
    inEnglish(<RscPayload path="/x" lineIncludes="sentKeys" />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByText("(no payload line matches)")).toBeDefined());
  });
});

describe("ChunkSearch", () => {
  it("reports which loaded chunks contain the text, and none when absent", async () => {
    vi.spyOn(performance, "getEntriesByType").mockReturnValue([
      { name: CHUNK_A_URL },
      { name: "http://x/_next/static/chunks/b.js" },
      { name: CHUNK_A_URL },
    ] as PerformanceEntry[]);
    stubFetch((url) => new Response(url.endsWith("a.js") ? "const marker = 'FOUND_ME'" : "nothing here"));
    inEnglish(<ChunkSearch needle="FOUND_ME" />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Searched 2 chunks: the text is in a.js."));
  });

  it("says the text was not shipped when no chunk has it", async () => {
    vi.spyOn(performance, "getEntriesByType").mockReturnValue([
      { name: CHUNK_A_URL },
    ] as PerformanceEntry[]);
    stubFetch(() => new Response("nothing"));
    inEnglish(<ChunkSearch needle="SECRET" />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("not shipped to the browser"));
  });
});
