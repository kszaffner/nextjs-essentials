---
description: Playwright end-to-end test scope and authoring rules.
paths:
  - "e2e/**/*.spec.*"
  - "**/*.e2e.spec.*"
---

# End-to-end testing (Playwright)

WHAT must be true.

## Scope: critical journeys, not UI permutations

E2E tests are the most expensive, slowest, and most brittle level in the
test pyramid — write the fewest of them, aimed only at journeys a real
user completes end-to-end and that the business actually depends on
(sign up, check out, submit the core form). Exhaustive UI-state coverage
belongs in unit/component tests; an e2e suite that tries to cover every
permutation becomes slow and flaky without adding proportional
confidence.

## Locate elements the way a user finds them

Prefer user-facing locators — `getByRole`, `getByLabel`, `getByText`,
`getByTestId` as a last resort — over CSS selectors or XPath tied to DOM
structure or class names. A locator scoped to structure breaks on every
unrelated markup/styling refactor; a role- or label-based locator only
breaks when the actual user-facing behavior changes, which is the only
thing this test level should be sensitive to.

## Never hand-roll waits

Rely on Playwright's auto-waiting and web-first assertions
(`await expect(locator).toBeVisible()`, `.toHaveText()`, ...) instead of
fixed `page.waitForTimeout()` sleeps. A fixed sleep is both slower than
necessary when the condition resolves quickly and still flaky when it
doesn't — auto-waiting retries the actual assertion until it passes or a
real timeout is hit.

## Isolate every test

Each test gets its own browser context (Playwright's default per-test
isolation) and sets up whatever state it needs — no test should depend
on another test having run first, and no test should leave state another
test could trip over. Seed required state through the application's own
API/setup hooks, not by chaining UI steps from a previous test.

## Run against a realistic build

When validating production-facing behavior (not local iteration), run
the suite against a production-mode build, not a dev server with hot
reload and dev-only warnings/overlays — those can mask or fake behavior
that doesn't exist in what actually ships.

## Keep CI fast and debuggable

Shard/parallelize across workers rather than running the suite serially.
Capture trace/video/screenshot only `on-first-retry` or `retain-on-failure`
— capturing them on every green run adds CI time and artifact storage
for no benefit. A red e2e test blocks the pipeline; a flaky one that gets
silently retried until green is worse than not having it, since it stops
being a real signal — fix or delete a test that fails intermittently for
reasons unrelated to the feature under test.
