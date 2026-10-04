import { describe, expect, it } from "vitest";
import { PROXY_DEMO_BASE, decideProxyAction, parseVariant } from "./decideProxyAction";

function decide(path: string, variantCookie?: string, randomValue = 0.1) {
  return decideProxyAction({ pathname: `${PROXY_DEMO_BASE}/${path}`, variantCookie, randomValue });
}

describe("decideProxyAction", () => {
  it("redirects the old URL to the new one", () => {
    expect(decide("old")).toEqual({ type: "redirect", destination: `${PROXY_DEMO_BASE}/new` });
  });

  it("rewrites the alias to its target", () => {
    expect(decide("alias")).toEqual({ type: "rewrite", destination: `${PROXY_DEMO_BASE}/target` });
  });

  it("answers the blocked URL itself with 403", () => {
    expect(decide("blocked")).toEqual({ type: "respond", status: 403, body: "Blocked by the proxy." });
  });

  it("lets every other URL continue", () => {
    expect(decide("anything-else")).toEqual({ type: "continue" });
  });

  describe("personalization", () => {
    it("assigns variant A to a first visit with a low random value", () => {
      expect(decide("personalized", undefined, 0.1)).toEqual({
        type: "rewrite",
        destination: `${PROXY_DEMO_BASE}/variant-a`,
        assignVariant: "a",
      });
    });

    it("assigns variant B to a first visit with a high random value", () => {
      expect(decide("personalized", undefined, 0.9)).toMatchObject({ assignVariant: "b" });
    });

    it("keeps a returning visitor's variant and assigns nothing new", () => {
      expect(decide("personalized", "b", 0.1)).toEqual({
        type: "rewrite",
        destination: `${PROXY_DEMO_BASE}/variant-b`,
        assignVariant: undefined,
      });
    });

    it("ignores a tampered cookie and assigns a valid variant", () => {
      expect(decide("personalized", "zzz", 0.1)).toMatchObject({
        destination: `${PROXY_DEMO_BASE}/variant-a`,
        assignVariant: "a",
      });
    });
  });
});

describe("parseVariant", () => {
  it("accepts only a and b", () => {
    expect(parseVariant("a")).toBe("a");
    expect(parseVariant("b")).toBe("b");
    expect(parseVariant("c")).toBeUndefined();
    expect(parseVariant(undefined)).toBeUndefined();
  });
});
