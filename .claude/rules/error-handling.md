---
description: Rendering error boundaries vs. explicit try/catch for Route Handlers and Server Actions.
paths:
  - "src/app/**/*.tsx"
  - "src/app/**/*.ts"
---

# Error handling (rendering vs. API)

WHAT must be true, in addition to `.claude/rules/fail-clearly.md`
and `.claude/rules/error-boundaries.md`.

## Next.js has no single error-handling mechanism

There are three distinct error surfaces, and confusing one for another
is the most common mistake: rendering errors are caught automatically
by a file convention; Route Handler and Server Action errors are not
caught by anything — an uncaught throw in either is a bug, not a
framework gap.

## Rendering: `error.tsx` and `global-error.tsx`

An `error.tsx` in a route segment is a Client Component, built on
`.claude/rules/error-boundaries.md`'s Error Boundary primitive, and catches
rendering errors thrown by Server or Client Components within that
segment (including errors thrown while a Server Component fetches
data) — it does not catch errors in the root layout itself, which needs
its own `global-error.tsx` at the app root (and must render its own
`<html>`/`<body>`, since it replaces the root layout when it fires).
Use `not-found.tsx` for the specific "this resource doesn't exist" case
instead of routing it through `error.tsx` — it's a distinct, expected
outcome, not an error.

## Route Handlers: try/catch is mandatory

A Route Handler (`route.ts`) that throws without catching does not
render `error.tsx` — API consumers expecting JSON get Next.js's default
error page/response instead of a usable error payload. Every Route
Handler must wrap its logic in `try`/`catch` and return a structured
JSON error response with the correct status code
(`NextResponse.json({ code, message }, { status })`) — same structured-
response rule as `.claude/rules/fail-clearly.md`, applied at
the one place Next.js won't do it automatically.

## Server Actions: don't throw for expected failures

A Server Action that throws for an expected failure (validation, a
business rule) surfaces as an unstyled framework error on the client
by default, not a usable form error. Return a serializable result
(`{ success: false, error: '...' }` or equivalent) for expected
failures instead of throwing, and reserve an actual `throw` for
genuinely unexpected failures the nearest `error.tsx` should catch when
the action is called during a transition that ties into that boundary.

## Don't let a Route Handler's error reach the client raw

Same rule as `.claude/rules/fail-clearly.md`'s trust-boundary
point, worth restating here because it's easy to forget in a catch
block that just does `NextResponse.json({ error: String(err) })`: that
can leak a raw stack trace or internal message. Map the caught error to
a stable public message/code; log the full detail
(`.claude/rules/error-monitoring.md`) server-side only.
