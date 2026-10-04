import { describe, expect, it } from "vitest";
import { buildRobots, buildSitemap } from "./buildSiteFiles";

const ORIGIN = "https://example.com";
const siteUrl = new URL(ORIGIN);
const ISR_PATH = "/rendering/isr";

describe("buildSitemap", () => {
  it("lists the home page first, then every topic, in every language, as absolute URLs", () => {
    const entries = buildSitemap(siteUrl, [ISR_PATH, "/data/revalidation"]);

    expect(entries.map((entry) => entry.url)).toEqual([
      `${ORIGIN}/pl`,
      `${ORIGIN}/en`,
      `${ORIGIN}/pl${ISR_PATH}`,
      `${ORIGIN}/en${ISR_PATH}`,
      `${ORIGIN}/pl/data/revalidation`,
      `${ORIGIN}/en/data/revalidation`,
    ]);
  });

  it("links each page to its translations, with Polish as the default", () => {
    const [polishHome] = buildSitemap(siteUrl, []);

    expect(polishHome?.alternates?.languages).toEqual({
      pl: `${ORIGIN}/pl`,
      en: `${ORIGIN}/en`,
      "x-default": `${ORIGIN}/pl`,
    });
  });

  it("gives the home page the highest priority", () => {
    const [home, , topic] = buildSitemap(siteUrl, [ISR_PATH]);

    expect(home?.priority).toBe(1);
    expect(topic?.priority).toBe(0.7);
  });

  it("does not invent a modification date", () => {
    const entries = buildSitemap(siteUrl, [ISR_PATH]);

    expect(entries.every((entry) => entry.lastModified === undefined)).toBe(true);
  });

  it("resolves paths from the origin root, so a base path in the site URL is not kept", () => {
    const [home] = buildSitemap(new URL(`${ORIGIN}/start/`), []);

    expect(home?.url).toBe(`${ORIGIN}/pl`);
  });
});

describe("buildRobots", () => {
  it("allows the site, blocks the API, and points at the sitemap", () => {
    expect(buildRobots(siteUrl)).toEqual({
      rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
      sitemap: `${ORIGIN}/sitemap.xml`,
    });
  });
});
