---
description: Test behavior, level, and maintainability rules.
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
---

# Testing

WHAT must be true.

## Behavior over implementation

- Test observable behavior (what a user/consumer sees or gets back), not
  internal implementation details (state shape, private helpers, internal
  structure).
- A refactor that preserves behavior should not require changing tests. If
  it does, the test was coupled to implementation.

## Test level

- Prefer the lowest level that actually exercises the behavior: pure logic
  → unit test; component/module behavior → component test; cross-module
  flow → integration test; a full user journey through a real browser →
  e2e test. Don't reach for a heavier test level than the behavior
  requires.
- The suite should be shaped like a pyramid: many fast unit/component
  tests, fewer integration tests, fewer still e2e tests — each level up
  is slower and more expensive to maintain, so it should also be smaller.
  See `.claude/rules/integration-testing.md` and `.claude/rules/e2e-playwright.md`
  for what belongs at those levels specifically.
- Mechanically enforced rules (e.g. architecture boundaries) are verified
  by actually invoking the enforcement tool against fixtures, not by unit
  tests re-asserting the rules in prose.

## Coverage

- New behavior needs a test that would fail without the change.
- A bug fix needs a regression test that reproduces the bug and fails on
  the old code.

## Integrity

- Never modify a test merely to make an incorrect implementation appear
  correct. If a test fails, determine whether the implementation, the
  test, or the requirement itself is wrong before changing anything.
- If a requirement is ambiguous, ask rather than picking behavior that
  happens to make the test pass.

## Maintainability

- Assertions should state what's actually being verified, not just
  `toBeTruthy()`/snapshot-everything.
- Avoid over-mocking to the point the test no longer exercises real
  integration between the pieces it claims to cover.
