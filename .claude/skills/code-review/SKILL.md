---
name: code-review
description: Review the current diff against this project's Rules (git/language rules and any project-specific rules under .claude/rules/). Use after implementing a change and before considering it done.
disable-model-invocation: true
---

# Code Review

Runs inline (has access to the current task context, implementation, and
conversation) — for a small/early-stage project, forking a review adds
overhead without benefit. Switch to a forked or agent-based review once
the project is large enough that inline review bloats the conversation.

## Procedure

1. Get the actual diff — start narrow, expand only if needed:

   ```text
   !git status --short
   !git diff --stat
   ```

   Then read the full diff for files that actually changed:

   ```text
   !git diff -- <changed-file>
   ```

2. Read changed files in full (not just diff hunks) when the diff alone
   doesn't give enough context to judge correctness.

3. Load `.claude/skills/code-review/checklist.md`, then
   `.claude/skills/code-review/nextjs-checklist.md`, and walk through
   both against the actual code. Apply every rule under `.claude/rules/` that
   is scoped to the changed files (check each rule file's `paths:`
   frontmatter). If a project-specific agent exists under
   `.claude/agents/` for the kind of file changed, consider invoking it
   for a deeper pass — see `.claude/agents/README.md`.

4. Check verification status — run the project's tests/build if one
   exists:

   ```text
   !<project's typecheck command>
   !<project's lint command>
   ```

   Note whether the output was actually read and matches expected
   behavior, not just that the command exited 0.

5. Report findings using this format:

   ```text
   CRITICAL
   <finding>

   HIGH
   <finding>

   MEDIUM
   <finding>

   LOW
   <finding>
   ```

   Each finding needs: location (file:line), the problem, why it matters,
   and a recommended fix.

   If there are no actionable findings:

   ```text
   Code Review — No actionable findings.

   Verification:
   ✓ <command> — result
   ```

   Do NOT produce a numeric score, percentage, or overall
   winner/loser-style conclusion. Findings are the output, not a grade.

6. Review actual code, not just the developer's description of what they
   did — the diff is the source of truth.

## After review

If there are actionable findings, fix them, re-verify, and review again —
repeat until clean or the developer stops the loop. See `examples.md` and
`nextjs-examples.md` for what a finding and a clean-pass report look like
end to end.
