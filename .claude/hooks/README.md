# Hooks are for deterministic outcomes only

WHAT must be true, and why.

## Strategy: deterministic only

Hooks run deterministic shell/script commands in response to tool-use
events. They are the right place for things that have one correct
outcome:

- formatting (auto-fixing on save)
- linting
- deterministic validation (e.g. blocking edits to a generated file)
- blocking a protected-branch commit/push
- blocking a write that matches a hardcoded-secret pattern
- running verification commands
- notifications

Hooks are **not** the right place for subjective judgment — "is this
abstraction justified," "does this dependency make business sense,"
"should this be split into two components." That judgment belongs to
Claude, reasoning inside the normal workflow, with the developer able to
see and steer it. Mechanical structural constraints (dependency
direction, boundary enforcement, cycles) belong to a dedicated tool
invoked as part of verification (a linter, an architecture-enforcement
tool), not to a hook re-implementing that judgment in shell.

## Deterministic vs. reasoning work

Two different kinds of work happen inside any engineering workflow, and
they use different tools:

- **Deterministic** (use tooling, not judgment): lint, typecheck, test,
  build, architecture check, `git diff`/`git status`, formatting. These
  have one correct outcome — run the tool, trust the result.
- **Reasoning** (use judgment, not a hook): architecture decisions,
  tradeoffs, requirements interpretation, security reasoning, performance
  reasoning, code review judgment, whether an abstraction is justified.

Don't encode subjective reasoning into a shell hook, and don't manually
re-derive something a deterministic tool already verifies.
