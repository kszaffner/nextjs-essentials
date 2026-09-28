/**
 * Sentry init for the browser runtime. Loaded automatically by
 * @sentry/nextjs when this file sits at the project root (or src/) —
 * see .claude/rules/observability-sentry.md for the reasoning behind each
 * setting.
 *
 * TODO: install `@sentry/nextjs` and set NEXT_PUBLIC_SENTRY_DSN.
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // TODO: wire to your actual deployment identifier (see
  // .claude/rules/observability-sentry.md's "release tied to the deployment" note)
  // rather than leaving this unset.
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  environment: process.env.NODE_ENV,

  // Opt-in, sampled — start conservative.
  tracesSampleRate: 0.1,
});
