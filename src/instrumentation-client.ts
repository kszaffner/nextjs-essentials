/**
 * Sentry init for the browser runtime, loaded automatically by Next.js.
 * See .claude/rules/observability-sentry.md. Without a DSN the SDK is a
 * no-op, so local development needs no configuration. The release comes
 * from `withSentryConfig` in next.config.ts so it matches the uploaded
 * source maps.
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Vercel exposes NEXT_PUBLIC_VERCEL_ENV (production | preview | development)
  // so the browser tags events like the server does.
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,

  // Opt-in, sampled — start conservative.
  tracesSampleRate: 0.1,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
