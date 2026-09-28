# Keep the agent roster small and narrow

WHAT must be true, and why.

## No agents by default

A project starts with zero specialized review agents. Add one only when a
review task is:

- **Narrow** — one specific, well-defined thing to check (a log format, a
  naming convention, a security-sensitive pattern), not "review
  everything."
- **Recurring** — comes up often enough that a dedicated pass earns its
  keep, rather than being a one-off best handled inline.
- **Non-overlapping** — doesn't duplicate what the project's own
  `code-review` skill already covers, and doesn't duplicate another
  existing agent's ground.

## Why not a larger roster

A larger multi-agent team (a "Frontend reviewer," "Backend reviewer,"
"QA agent," a generic "Reviewer," ...) sounds thorough but has real
costs:

- It assumes access to expensive, high-parallel agent workflows that not
  every setup supports.
- Every additional agent is another isolated context that has to be
  briefed, and another place for the "what actually happened" summary to
  get lossy on the way back to the developer.
- A larger review roster modeled after a big production app has nothing
  real to review in a small or early-stage project — it just produces
  findings for the sake of having an agent to run.
- Most of what a large agent team buys — architectural judgment, security
  reasoning, review quality — is already covered by Rules + Skills +
  Knowledge running in the main context, where the developer can see and
  steer it directly.

Add agents in proportion to what the project actually needs, not to what
a bigger project might need.

## How to introduce a specialized agent

1. Define it with a specific, bounded responsibility, meaningfully
   different from any existing agent — not a generic "second opinion"
   agent.
2. Keep read-only tools (Read/Grep/Glob/Bash) unless it genuinely needs
   to write. Keep it forked (isolated) unless there's a concrete reason
   the developer needs to interact with it mid-task.
3. Give it a concise report format, and make sure it returns that report
   to the context that invoked it — not a transcript of its search
   process.
4. Give it an explicit "Boundaries — do not report" section naming which
   existing agent or skill already owns adjacent ground, so findings
   don't duplicate or conflict.
5. Add it deliberately, for a demonstrated recurring need — not
   speculatively, "in case it's useful later."

Do not default back to a large agent team just because it's possible to
build one.
