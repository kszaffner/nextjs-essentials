import { z } from "zod";

// An empty variable (as `vercel env pull` or a copied .env file can produce)
// counts as not set.
const emptyAsUndefined = (value: unknown) => (value === "" ? undefined : value);

const SiteEnvironmentSchema = z.object({
  // The canonical origin, set explicitly.
  SITE_ORIGIN: z.preprocess(emptyAsUndefined, z.url().optional()),
  // Set by Vercel: the production domain, without a protocol.
  VERCEL_PROJECT_PRODUCTION_URL: z.preprocess(emptyAsUndefined, z.string().optional()),
  PORT: z.preprocess(emptyAsUndefined, z.string().optional()),
});

// The absolute URL of this site: the base for metadata, the sitemap, and the
// robots file. Never derived from a request, so a caller cannot choose it.
export function getSiteUrl(): URL {
  const environment = SiteEnvironmentSchema.parse(process.env);

  if (environment.SITE_ORIGIN) {
    return new URL(environment.SITE_ORIGIN);
  }
  if (environment.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${environment.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  return new URL(`http://localhost:${environment.PORT ?? "3000"}`);
}
