export const PROXY_DEMO_BASE = "/advanced-routing/proxy/demo";
export const VARIANT_COOKIE_NAME = "demo-variant";

export type Variant = "a" | "b";

export function parseVariant(value: string | undefined): Variant | undefined {
  return value === "a" || value === "b" ? value : undefined;
}

export type ProxyAction =
  | { type: "continue" }
  | { type: "redirect"; destination: string }
  | { type: "rewrite"; destination: string; assignVariant?: Variant }
  | { type: "respond"; status: number; body: string };

export type ProxyInput = {
  pathname: string;
  variantCookie: string | undefined;
  // Injected so the decision stays a pure, testable function.
  randomValue: number;
};

// All the routing decisions of the demo, kept out of proxy.ts so they can be
// tested without a request: the file only turns the result into a response.
export function decideProxyAction({
  pathname,
  variantCookie,
  randomValue,
}: ProxyInput): ProxyAction {
  switch (pathname) {
    case `${PROXY_DEMO_BASE}/old`:
      return { type: "redirect", destination: `${PROXY_DEMO_BASE}/new` };

    case `${PROXY_DEMO_BASE}/alias`:
      return { type: "rewrite", destination: `${PROXY_DEMO_BASE}/target` };

    case `${PROXY_DEMO_BASE}/personalized`: {
      const existingVariant = parseVariant(variantCookie);
      const variant = existingVariant ?? (randomValue < 0.5 ? "a" : "b");
      return {
        type: "rewrite",
        destination: `${PROXY_DEMO_BASE}/variant-${variant}`,
        // Only a first visit assigns a variant; later ones keep the cookie.
        assignVariant: existingVariant ? undefined : variant,
      };
    }

    case `${PROXY_DEMO_BASE}/blocked`:
      return { type: "respond", status: 403, body: "Blocked by the proxy." };

    default:
      return { type: "continue" };
  }
}
