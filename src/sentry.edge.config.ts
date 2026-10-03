/**
 * Sentry init for the Edge runtime. Separate from the server config
 * because Edge is not Node.js: skipping this file means edge errors are
 * never reported, not that they fall back to the server config.
 * Registered from instrumentation.ts. See
 * .claude/rules/observability-sentry.md.
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
