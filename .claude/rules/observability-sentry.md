---
description: Sentry setup across Next.js's client/server/edge runtimes.
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
  - "next.config.*"
---

# Sentry (Next.js)

WHAT must be true, in addition to `.claude/rules/error-monitoring.md`
and `.claude/rules/error-boundaries.md`.

## Three runtimes, three configs

A Next.js app runs code in the browser, in a Node.js server process, and
optionally in the Edge runtime — each needs its own Sentry
initialization (via `instrumentation.ts`'s `register()` for
server/edge, plus a client config for the browser), because each
runtime has different capabilities and a single shared `Sentry.init()`
call cannot correctly cover all three. Skipping the edge config silently
means edge middleware errors are never reported at all, not that they
fall back to the server config.

## Wrap `next.config` for source maps

Wrap the Next.js config with the SDK's own config helper
(`withSentryConfig`) so production stack traces resolve to real source
locations instead of minified bundle positions — without it, every
reported error's stack trace is close to useless for a production
build.

## Rendering errors: `error.tsx` reports, doesn't just display

`error.tsx`/`global-error.tsx` (see `.claude/rules/error-handling.md` for the file
conventions themselves) are Client Components built on the same
Error Boundary primitive as `.claude/rules/error-boundaries.md` — call
`Sentry.captureException` in a `useEffect` inside the error component
when it mounts, since the boundary catching the error and reporting it
are two separate responsibilities the file only handles one of by
default.

## Route Handlers and Server Actions: capture in the catch block

Errors thrown inside a Route Handler or Server Action never reach any
Error Boundary — they must be caught explicitly (see `.claude/rules/error-handling.md`) and reported with `Sentry.captureException` from
inside that `catch` block, applying the same expected-vs-unexpected
filter as `.claude/rules/error-monitoring.md` before deciding
whether a given caught error is even worth reporting.

## Release tied to the deployment, not the build machine

Set `release` from the actual deployment identifier your platform
provides (a commit SHA, a deployment id) rather than a hand-maintained
version string — for source maps to resolve correctly, the `release`
value at runtime must match the one the build step used when uploading
them.
