---
description: Branching, commit, and language rules for everything written into this repository.
paths:
  - "**/*"
---

# Git and project text

WHAT must be true.

## English only

All project text is English: code, comments, log messages, docs, commit
messages, PR descriptions. The conversation with the user may be in
another language, but everything written into the codebase is English.

## Commits

Prefer small, focused commits — one logical change per commit. Only
commit when the user asks for it.

## Protected main

Never push directly to `main`. Always work on a feature branch and open a
PR, even from an isolated worktree session — see
`.claude/hooks/protect-main-branch.sh` for the mechanical enforcement.
