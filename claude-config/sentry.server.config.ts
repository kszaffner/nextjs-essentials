/**
 * Sentry init for the Node.js server runtime (Route Handlers, Server
 * Actions, Server Components rendering on the server) — see
 * .claude/rules/observability-sentry.md and .claude/rules/error-handling.md for where this
 * actually gets used (capture in a Route Handler/Server Action catch
 * block, or from an error.tsx's useEffect).
 *
 * TODO: install `@sentry/nextjs` and set SENTRY_DSN (server-side only —
 * never the NEXT_PUBLIC_ variant here, since this runs where secrets are
 * safe to hold).
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.SENTRY_RELEASE,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
