---
description: How to scope and write integration tests correctly.
paths:
  - "**/*.integration.test.*"
  - "**/*.integration.spec.*"
---

# Integration testing

WHAT must be true, in addition to `.claude/rules/behavior-over-implementation.md`.

## What an integration test is for

An integration test exists to catch defects that only appear when two or
more real pieces are wired together — a route handler that actually calls
its service, a service that actually talks to a real (or realistic)
database, a client that actually parses a real server's response shape.
If a test would pass identically with every collaborator replaced by a
mock, it isn't testing integration — it's a unit test wearing a slower
disguise.

## Mock at the true boundary only

Mock or fake only what actually crosses a boundary this codebase doesn't
own: a third-party API, a payment provider, wall-clock time, randomness.
Everything inside the boundary — your own services, your own database
access layer, your own internal modules — should be real. Faking an
internal collaborator to make a test "integration-shaped" defeats the
point: the seam between your own modules is exactly what this test level
exists to verify.

## Prefer a real, disposable dependency over a mock

For a database, queue, or cache, prefer a real instance scoped to the
test run (an in-memory engine, a throwaway container, a test-schema
transaction rolled back after each test) over mocking the client
library. Mocking a database client only proves the code calls the mock
correctly, not that the query is valid or the schema assumption holds.

## Keep the count proportional

Integration tests are slower and costlier to maintain than unit tests —
write fewer of them, and aim each one at a distinct critical seam (an API
contract, a persistence round-trip, an auth flow) rather than
re-deriving every unit-level edge case at this level. If a class of bugs
is fully reachable with a unit test, test it there instead.

## Isolation and determinism

Each test must set up its own state and clean up after itself — no test
should depend on another test's side effects or execution order. Never
let an integration test depend on a live third-party network call in CI;
that's the job of a contract test or a staging smoke test, not this
level, and a flaky network dependency erodes trust in the whole suite.
