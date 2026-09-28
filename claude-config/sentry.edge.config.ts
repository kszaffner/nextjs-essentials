/**
 * Sentry init for the Edge runtime (edge middleware, Edge-runtime Route
 * Handlers). Separate from sentry.server.config.ts because the Edge
 * runtime is not Node.js — a different, smaller Sentry SDK surface
 * applies here. Skipping this file means edge errors are silently never
 * reported, not that they fall back to the server config — see
 * .claude/rules/observability-sentry.md's "three runtimes, three configs" note.
 *
 * TODO: install `@sentry/nextjs` and set SENTRY_DSN.
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.SENTRY_RELEASE,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
