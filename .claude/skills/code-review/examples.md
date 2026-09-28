# Code Review Output Examples

Loaded on demand — not part of the default `SKILL.md` procedure.

## Example: findings present

```text
CRITICAL
src/auth/session.js:42 — Session token is compared with `==` instead of
a constant-time comparison. This is a timing-attack surface; use a
constant-time comparison function instead.

HIGH
src/db/client.js:1 — Imports a new dependency to do a single `isEmpty`
check. Prefer the language/stdlib equivalent instead of adding a
dependency for one call site.

MEDIUM
package.json — Version bump for a dependency wasn't accompanied by a
check of its changelog for breaking changes.

LOW
src/utils/format.js:9 — Comment is in a language other than English. All
project text must be English (see .claude/rules/conventions.md).
```

## Example: no actionable findings

```text
Code Review — No actionable findings.

Verification:
✓ test suite — all tests pass
```
