/**
 * Sentry init for the Node.js server runtime (Route Handlers, Server
 * Actions, Server Components). Registered from instrumentation.ts.
 * The DSN is server-side only: never the NEXT_PUBLIC_ variant here.
 * See .claude/rules/observability-sentry.md.
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
