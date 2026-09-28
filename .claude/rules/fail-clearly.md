---
description: Technology-independent error-handling rules.
paths:
  - "**/*"
---

# Fail clearly, never silently

WHAT must be true.

## Catch only where you can act

Only catch an error where you can do one of: recover and continue,
translate it into a different error the caller needs, or add context
before letting it propagate. A `catch` block that logs and does nothing
else, or swallows the error entirely, hides a failure from everything
downstream that might have handled it correctly — including the
monitoring integration (`.claude/rules/error-monitoring.md`)
that never gets a chance to see it.

## Never swallow

An empty `catch {}`, a `catch` that only logs, or a `.catch(() => {})`
on a promise are almost always bugs. If a failure genuinely doesn't
matter, that has to be a deliberate, commented decision at the specific
call site — not the default behavior of "I don't know what to do with
this error."

## Expected vs. unexpected

Expected failures (a not-found lookup, a validation error, a business
rule rejecting the request) are part of the API contract — model them
as typed/structured results or specific error types the caller is
expected to handle, not as a generic thrown exception indistinguishable
from a bug. Unexpected failures (a dependency being unreachable, a
programmer error) should propagate as exceptions and be reported
(`.claude/rules/error-monitoring.md`), not silently converted
into a fallback value that hides that something is actually wrong.

## Never leak internals across a trust boundary

An error response sent to an external caller (an HTTP client, a
different service) must never include a stack trace, an internal file
path, a raw database error message, or any other implementation detail
— see `.claude/rules/trust-boundary-validation.md`. Log the full
detail internally; return a stable, minimal error shape (a code and a
human-readable message) externally.

## Structure the response, don't stringify it

An API's error response should be a structured shape (`{ code,
message, details? }` or equivalent) with a real HTTP status code, not
an error message stuffed into a 200 response body or a plain string.
A caller that has to parse prose to know what went wrong can't build
reliable error handling of its own.
