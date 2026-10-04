import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteUrl } from "./siteUrl";

afterEach(() => {
  vi.unstubAllEnvs();
});

function setEnvironment(values: Record<string, string | undefined>) {
  vi.stubEnv("SITE_ORIGIN", values.SITE_ORIGIN);
  vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", values.VERCEL_PROJECT_PRODUCTION_URL);
  vi.stubEnv("PORT", values.PORT);
}

describe("getSiteUrl", () => {
  it("prefers the explicit origin", () => {
    setEnvironment({ SITE_ORIGIN: "https://example.com", VERCEL_PROJECT_PRODUCTION_URL: "vercel.example" });

    expect(getSiteUrl().origin).toBe("https://example.com");
  });

  it("falls back to the Vercel production domain, adding the protocol", () => {
    setEnvironment({ VERCEL_PROJECT_PRODUCTION_URL: "my-site.vercel.app" });

    expect(getSiteUrl().origin).toBe("https://my-site.vercel.app");
  });

  it("falls back to localhost with the configured port", () => {
    setEnvironment({ PORT: "4000" });

    expect(getSiteUrl().origin).toBe("http://localhost:4000");
  });

  it("falls back to localhost:3000 when nothing is set", () => {
    setEnvironment({});

    expect(getSiteUrl().origin).toBe("http://localhost:3000");
  });

  it("treats an empty variable as not set", () => {
    setEnvironment({ SITE_ORIGIN: "", VERCEL_PROJECT_PRODUCTION_URL: "" });

    expect(getSiteUrl().origin).toBe("http://localhost:3000");
  });

  it("rejects an origin that is not a URL instead of using it", () => {
    setEnvironment({ SITE_ORIGIN: "not a url" });

    expect(() => getSiteUrl()).toThrow();
  });
});
