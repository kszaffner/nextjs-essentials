import "server-only";
import { z } from "zod";

// An empty variable (as `vercel env pull` or a copied .env file can produce)
// counts as not set.
const emptyAsUndefined = (value: unknown) => (value === "" ? undefined : value);

const EnvironmentSchema = z.object({
  // Where this app can reach itself over HTTP (the demo fetches its own API).
  SITE_ORIGIN: z.preprocess(emptyAsUndefined, z.url().optional()),
  PORT: z.string().optional(),
});

const environment = EnvironmentSchema.parse(process.env);

// Never taken from the request: building a URL from the Host header would let
// a caller point the server's fetch at any host (SSRF).
export function getSiteOrigin(): string | undefined {
  if (environment.SITE_ORIGIN) {
    return environment.SITE_ORIGIN;
  }
  if (process.env.NODE_ENV !== "production") {
    return `http://localhost:${environment.PORT ?? "3000"}`;
  }
  return undefined;
}
