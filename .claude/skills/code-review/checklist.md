# Code Review Checklist

Loaded on demand by `SKILL.md` — not duplicated there. This restates
nothing from `.claude/rules/`; it's a review pass order, not a second copy
of the rules.

## Correctness

- [ ] The change does what it claims to do, verified by reading the code
      — not just the developer's description of it
- [ ] Edge cases and error paths are handled, not just the happy path
- [ ] No obviously wrong logic (off-by-one, wrong operator, inverted
      condition, unhandled null/undefined)

## Project-specific rules

- [ ] Every rule under `.claude/rules/` whose `paths:` frontmatter
      matches a changed file is satisfied
- [ ] No new dependency added without a clear reason

## Language and process

- [ ] All code, comments, and log messages are English
- [ ] No direct commit/push to `main` (mechanically enforced by
      `.claude/hooks/protect-main-branch.sh`, but check anyway)
- [ ] No hardcoded secrets or credentials introduced

## Scope and regression risk

- [ ] Nothing outside the stated scope was modified without reason
- [ ] Shared/reused code changes don't break other callers
