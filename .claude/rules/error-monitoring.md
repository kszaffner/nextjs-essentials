---
description: What to capture, attach, and never send to an error monitoring service.
paths:
  - "**/*"
---

# Error monitoring and observability

WHAT must be true.

## Capture centrally, not ad hoc

Unhandled exceptions and unhandled promise rejections must reach the
monitoring service through one central integration point (a global
handler, a framework's own error hook), not scattered manual
`captureException` calls hoping every code path remembers to make one.
Manual capture is still needed at boundaries the central handler can't
see (a caught error you intentionally don't rethrow) — see below.

## Attach context, not everything

Every reported error should carry enough context to reproduce or
triage it without reading the stack trace alone: a request/trace id,
the route or operation, a build/release version, and — for a signed-in
user — a stable, non-reversible identifier. Never attach the values
that made the request meaningful in the first place if they're
sensitive: no passwords, tokens, full payment details, or raw request/
response bodies that might carry personal data. Scrub or omit rather
than guess that a field is safe.

## Expected vs. unexpected

Distinguish an error the code already handles correctly (validation
failure, not-found, a user hitting a rate limit) from one it doesn't
(an unhandled exception, an unreachable dependency). Reporting every
handled 4xx-shaped case as an error-monitoring event buries the signal
that actually needs attention under noise nobody will triage. Handled,
expected cases belong in regular logs/metrics, not the error monitor.

## Don't let capture failures cascade

Reporting an error must never be allowed to throw and mask the
original error, or block the response the caller is waiting on. Capture
is fire-and-forget from the request's perspective — log locally and
move on if the monitoring service itself is unreachable.

## Alert on rate, not raw count

A single occurrence of a rare edge case and a sudden spike from a bad
deploy are different problems — alerting rules should be based on
error rate/frequency thresholds and new-issue detection, not "any error
at all," which either pages someone for nothing or gets muted until it
misses the deploy that actually matters.
