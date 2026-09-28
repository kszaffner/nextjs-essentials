---
description: Validation, auth, and secrets rules that hold regardless of runtime (server, SPA, CLI, ...).
paths:
  - "**/*"
---

# Trust boundary validation

WHAT must be true.

## Input validation

- Validate all untrusted input where it actually crosses into your code —
  arguments to a privileged operation, a request body, a query/search
  param, a response from another system. Never assume the caller sent
  well-formed data, even if every known caller currently only sends valid
  shapes.
- Client-side (or caller-side) validation is UX, not a security control.
  The real boundary is wherever your code is the one deciding what to
  trust — re-validate there even when a caller already validated.

## Authentication & authorization

- Authentication answers "who is this"; authorization answers "can they
  do this." Check both, separately, for every mutation and every access
  to non-public data.
- Never treat a hidden button, disabled control, or caller-side check as
  an actual security boundary — it's UX, not enforcement. Authorization
  must be re-checked wherever the actual privileged operation happens.

## Secrets

- Secrets live in environment variables or a secret store, never
  hardcoded, never committed.
- Know what "the client" means for your runtime, and never let a secret
  reach it: a browser bundle, a public API response, a log line a
  non-privileged party can read.

## Sensitive data exposure

- Don't return or hold more data than the caller/consumer actually needs
  — it's easy for extra fields to leak further than intended (into logs,
  into a UI, into a response).
- Error messages surfaced outside your own process should not leak stack
  traces, internal identifiers, or query/schema details.
