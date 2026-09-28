---
description: Validation, auth, secrets, and server/client exposure rules specific to the App Router.
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Security (App Router specifics)

WHAT must be true, in addition to the technology-independent rules (see
`.claude/rules/trust-boundary-validation.md`).

## Server/client boundary

Secrets and data-access code must be marked `server-only`; check whether
anything a module's `index.ts` exports could leak a server-only value
into a client bundle.

## Server Actions & route handlers

All input (arguments, request bodies, query/search params, headers) must
be validated at the boundary, server-side — never trust that the client
only ever sends valid shapes, even when client-side validation already
exists.

## Authorization

Authentication ("who is this") and authorization ("can they do this")
must both be checked, and re-checked, inside the Server Action/route
handler itself — not inferred from a hidden button or disabled UI
control.

## CSRF

Server Actions and route handlers that mutate state should not rely
solely on cookie presence for trust when the request could be triggered
cross-site; use the framework's built-in Server Action protections and
same-site cookies where applicable.

## Sensitive data exposure

Don't return more data from a server function than the caller needs
(e.g. don't return a full user record when only `id` and `name` are
used) — it's easy for extra fields to leak into a client component's
props. Error messages returned to the client should not leak stack
traces, internal identifiers, or query details.
