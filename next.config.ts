import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components: enables "use cache", cacheLife, cacheTag and Partial
  // Prerendering. Enabled from the start so every demo is written against
  // the current caching model; older behavior is shown only as contrast.
  cacheComponents: true,
  reactCompiler: true,
};

export default withSentryConfig(nextConfig, {
  // Source map upload needs SENTRY_AUTH_TOKEN; without it the build still
  // succeeds and simply skips the upload.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  // Tie the release to the deployment so runtime events match the uploaded
  // source maps (.claude/rules/observability-sentry.md).
  release: { name: process.env.VERCEL_GIT_COMMIT_SHA },
});
