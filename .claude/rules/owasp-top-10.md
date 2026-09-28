---
description: Using the OWASP Top 10 as an audit framework, kept current rather than assumed.
paths:
  - "**/*"
---

# OWASP Top 10

WHAT must be true.

## Verify the current edition before relying on this list

OWASP revises the Top 10 periodically, not annually — prior editions shipped in 2013, 2017, and
2021, each with categories added, removed, renamed, or reordered. Treat the 2021 snapshot below as
a **starting point authored at a point in time**, never as a live source of truth. Before using
this as an actual audit checklist, fetch the current list from
`https://owasp.org/www-project-top-ten/` (an agent doing this review has `WebFetch`/`WebSearch` for
exactly this reason — use them rather than assuming this document is still accurate). If the
current published edition differs from what's below, the live one wins; note the discrepancy in
the review rather than silently reconciling it.

## The 2021 categories (verify currency first)

Each maps to where this codebase's own rules already cover it structurally — this item is a
cross-cutting index into that existing ground truth, not a second, competing copy of it.

- **A01 Broken Access Control** — enforcing authorization server-side, never trusting a
  client-hidden control as a real boundary. See `.claude/rules/trust-boundary-validation.md` and
  each scope's own security-rules item.
- **A02 Cryptographic Failures** — secrets never in source/bundles, sensitive data never logged or
  exposed in error responses. See `.claude/rules/fail-clearly.md`'s trust-boundary section
  and each scope's security-rules item.
- **A03 Injection** — SQL/NoSQL/command/template injection from unvalidated input; for a frontend,
  XSS from unsanitized HTML. Validate/parse everything crossing a trust boundary (see
  `.claude/rules/runtime-validation.md`), never string-concatenate untrusted input into a query/command.
- **A04 Insecure Design** — a flaw in the design itself (e.g. a business rule enforceable only
  client-side), not a bug in an otherwise-sound design. Distinct from A01: this is "the boundary
  was never designed to exist," not "the boundary exists but was bypassed."
- **A05 Security Misconfiguration** — default credentials, verbose error pages/stack traces
  reaching production, unnecessary features/ports/services enabled. See
  `.claude/rules/fail-clearly.md`'s "never leak internals" rule.
- **A06 Vulnerable and Outdated Components** — dependencies with known CVEs or that are
  unmaintained. Already part of every security-auditor agent's "Dependency & supply chain"
  checklist item.
- **A07 Identification and Authentication Failures** — weak session handling, credential stuffing
  exposure, tokens that don't expire/rotate. See each scope's security-rules item's
  authentication/token-handling section.
- **A08 Software and Data Integrity Failures** — trusting unsigned/unverified code or data (a CI/CD
  pipeline pulling unpinned dependencies, deserializing untrusted data without integrity checks).
- **A09 Security Logging and Monitoring Failures** — not logging security-relevant events, or
  logging without the context needed to investigate later. See
  `.claude/rules/error-monitoring.md`.
- **A10 Server-Side Request Forgery (SSRF)** — a server making a request to a URL built from
  unvalidated user input, reaching internal-only services. Backend-only category; not applicable
  to a pure client-side SPA with no server-only code.

## How to use this during a review

When a finding maps cleanly to a category, name it in the report (e.g. "OWASP A03: Injection") —
it gives the finding externally-recognized context and makes severity comparisons easier across
reviews. Don't force a finding into a category it doesn't genuinely fit; not everything security-
relevant is OWASP-Top-10-shaped, and this list is a cross-check, not the sole audit framework.
