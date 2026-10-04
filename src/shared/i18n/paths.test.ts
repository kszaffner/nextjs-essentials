import { describe, expect, it } from "vitest";
import { localizePath, resolveLocaleRedirect, splitLocale, switchLocalePath } from "./paths";

const ISR_PATH = "/data/isr";
const LOCALIZED_ISR_PATH = "/en/data/isr";

describe("splitLocale", () => {
  it("separates a known locale prefix", () => {
    expect(splitLocale(LOCALIZED_ISR_PATH)).toEqual({ locale: "en", path: ISR_PATH });
    expect(splitLocale("/pl")).toEqual({ locale: "pl", path: "/" });
  });

  it("leaves a path without a locale alone", () => {
    expect(splitLocale(ISR_PATH)).toEqual({ locale: undefined, path: ISR_PATH });
    expect(splitLocale("/english")).toEqual({ locale: undefined, path: "/english" });
  });
});

describe("localizePath", () => {
  it("adds the prefix to an internal path", () => {
    expect(localizePath("en", ISR_PATH)).toBe(LOCALIZED_ISR_PATH);
    expect(localizePath("pl", "/")).toBe("/pl");
  });

  it("does not prefix twice, or touch external and relative targets", () => {
    expect(localizePath("pl", LOCALIZED_ISR_PATH)).toBe(LOCALIZED_ISR_PATH);
    expect(localizePath("en", "https://nextjs.org")).toBe("https://nextjs.org");
    expect(localizePath("en", "//cdn.example.com/a")).toBe("//cdn.example.com/a");
    expect(localizePath("en", "?tab=link")).toBe("?tab=link");
  });

  it("keeps a query string", () => {
    expect(localizePath("en", "/data/isr?tab=1")).toBe("/en/data/isr?tab=1");
  });
});

describe("switchLocalePath", () => {
  it("swaps the prefix and keeps the page", () => {
    expect(switchLocalePath("/pl" + ISR_PATH, "en")).toBe(LOCALIZED_ISR_PATH);
    expect(switchLocalePath("/en", "pl")).toBe("/pl");
  });
});

describe("resolveLocaleRedirect", () => {
  it("sends an unprefixed path to the default locale", () => {
    expect(resolveLocaleRedirect({ pathname: ISR_PATH, search: "?a=1", cookieLocale: undefined })).toBe(
      "/pl/data/isr?a=1",
    );
  });

  it("prefers the remembered locale", () => {
    expect(resolveLocaleRedirect({ pathname: "/", search: "", cookieLocale: "en" })).toBe("/en");
  });

  it("ignores an unknown cookie value", () => {
    expect(resolveLocaleRedirect({ pathname: "/", search: "", cookieLocale: "de" })).toBe("/pl");
  });

  it("does nothing when a prefix is present", () => {
    expect(resolveLocaleRedirect({ pathname: "/en/x", search: "", cookieLocale: "pl" })).toBeUndefined();
  });
});
