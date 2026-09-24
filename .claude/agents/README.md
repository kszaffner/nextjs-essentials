# Agents

This starter ships a **small, bounded agent roster**: the built-in
`Explore` agent (used by `.claude/skills/explore`), plus four read-only
review agents, each owning one non-overlapping concern:

| Agent | Owns | Color |
|---|---|---|
| `performance-reviewer` | Server/Client boundary cost, data fetching & caching, rendering cost, algorithmic efficiency | green |
| `security-auditor` | Input validation, authN/authZ, server/client data exposure, secrets, dependencies | yellow |
| `nextjs-reviewer` | App Router correctness — routing, Server Actions, caching semantics, metadata/streaming | blue |
| `architecture-reviewer` | The semantic judgment `pnpm architecture:check` can't make mechanically — is a cross-module dependency real, does `shared` stay generic, is module structure premature or deficient | purple |

None of the four can modify code — see each agent's `tools:` frontmatter
(no `Write`/`Edit`). They report findings; the calling workflow
(`/new-feature`, or the developer directly) applies fixes. Each has an
explicit "Boundaries — do not report" section naming which of the other
three owns a given concern, so findings don't duplicate or conflict
across agents. Each may append durable, non-obvious notes to its own
`.claude/agent-memory/<name>.md` — that file is its only write surface;
none may edit its own or another agent's definition under
`.claude/agents/`.

## Why this roster, and not a larger one

A larger multi-agent team (Frontend, Backend, QA, a generic "Reviewer,"
...) sounds thorough but has real costs:

- It assumes access to expensive, high-parallel agent workflows that not
  every developer's plan supports. This starter has to work on ordinary
  Claude Code usage, not just the most capable tier.
- Every additional agent is another isolated context that has to be
  briefed, and another place for the "what actually happened" summary to
  get lossy on the way back to the developer.
- Most of what a large agent team buys — architectural judgment, security
  reasoning, review quality — is already covered by the Rules + Skills +
  Knowledge workflow running in the main context, where the developer can
  see and steer it directly.

The four agents here exist because each owns a concern that benefits from
a dedicated, deeper pass than `/code-review`'s inline checklist gives it
(see `.claude/skills/code-review/checklist.md` — the checklist is a quick
pass order, these agents are the deep dive). They stay narrow on purpose:
none of them fix code, none of them run in an isolated fork by default
(the developer can still see them invoked and steer them), and none
duplicate what `pnpm architecture:check`, ESLint, or TypeScript already
catch mechanically.

## When subagents are actually useful

Forking earns its cost when the work is large, mostly mechanical, and the
main context doesn't need to see the process — only the result. The
primary case in this starter is **large repository exploration**
(`.claude/skills/explore/SKILL.md`, `context: fork`, `agent: Explore`):
deep searches across many files that would otherwise bloat the main
conversation with search noise the developer never needed to see. The
four review agents above are a different case — narrow judgment passes,
not bulk mechanical search — so they aren't forked by default.

Everything else in this starter's workflow (`new-feature`, `code-review`,
`test-loop`, `knowledge`) stays inline on purpose — see
`.claude/skills/*/SKILL.md` frontmatter and `docs/skills.md` for why each
one made that choice.

## How to introduce another specialized agent later

If a project genuinely grows into needing another dedicated agent (e.g. a
state-management reviewer once a state library is actually adopted),
introduce it narrowly:

1. Define the agent with a specific, bounded responsibility that's
   meaningfully different from the four above — not a generic "second
   opinion" agent.
2. Keep it forked (isolated) unless there's a concrete reason the
   developer needs to interact with it mid-task.
3. Make sure it returns a concise report, not a transcript, to the
   context that invoked it.
4. Give it an explicit "Boundaries — do not report" section that names
   which existing agent already owns adjacent ground.
5. Add it deliberately, for a demonstrated recurring need — not
   speculatively, "in case it's useful later."

Do not default back to a large agent team just because it's possible to
build one.
