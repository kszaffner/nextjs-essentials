# AGENTS.md

## Repository purpose

This repository is `nextjs-essentials`: a showcase application covering
every major Next.js feature (latest major version, App Router) as a
self-contained, interview-ready reference — each feature demonstrated in
isolation, including edge cases, alongside a happy path.

The Claude Code engineering workflow (`.claude/`, `AGENTS.md`,
`ai-workflow-config/`) is copied in from the dedicated starter repository
`kszaffner/nextjs-claude-starter`, which is the source of truth for the
workflow itself (rules, skills, hooks, knowledge structure). Its extended
docs (`docs/`) and its own example app (`example/`, `src/`) live only in
that source repo, not here — see it directly for the full rationale
behind each rule/skill.

## Architecture

Feature-oriented, three layers (same convention enforced by the starter's
`.claude/rules/architecture.md`):

```text
src/
├── app/       # routes, layouts, route-level composition — stays thin
├── modules/   # one module per showcased Next.js feature; public API via index.ts
└── shared/    # genuinely reusable, feature-agnostic code only
```

Dependency direction: `app → modules`, `app → shared`, `modules → shared`.
Forbidden: `shared → modules`, reaching into another module's internal
files, and any circular dependency. Mechanically enforced by
`ai-workflow-config/dependency-cruiser.cjs` (`pnpm architecture:check`),
not just by convention.

> This `src/` layout does not exist yet — this repo currently only holds
> the AI workflow files. Scaffold the Next.js app deliberately following
> this convention rather than starting from `create-next-app`'s default
> layout unmodified.

## Project structure

```text
.claude/
├── rules/        # WHAT must be true — scoped by `paths:` frontmatter
├── skills/       # HOW work is performed — /new-feature, /code-review, /test-loop, /knowledge, /explore
├── knowledge/    # WHY the project is built this way (optional, Git-versioned)
├── agents/       # agent strategy (V1: minimal, see agents/README.md)
└── hooks/        # deterministic hook strategy, see hooks/README.md

ai-workflow-config/   # non-Claude project config copied alongside .claude/ (dependency-cruiser.cjs)
```

The workflow's extended docs, its own worked example, and its demo `src/`
app are intentionally not copied here — see them in
`kszaffner/nextjs-claude-starter` directly when the reasoning behind a
rule/skill isn't clear from the file itself.

## Important commands

```text
pnpm install
pnpm dev
pnpm lint                # eslint
pnpm typecheck            # tsc --noEmit
pnpm test                 # vitest (includes architecture enforcement tests)
pnpm architecture:check   # dependency-cruiser
pnpm build                # production build
pnpm check                # aggregates lint + typecheck + architecture:check + test
```

> Not wired up yet — there is no `package.json`/Next.js app in this repo
> yet. Add these scripts (and a `test/architecture.test.ts` with fixtures,
> mirroring the starter repo) when the app is scaffolded.

## Architecture entry points

- `ai-workflow-config/dependency-cruiser.cjs` — the enforced rules (circular deps,
  `shared → modules`, module-internal reach-through, invalid direction).
- `test/architecture.test.ts` + `test/fixtures/architecture/*` (to be
  added) — negative and positive tests proving those rules actually fire.

## Testing

Vitest (`pnpm test`). Component tests use Testing Library
(`@testing-library/react`, jsdom). Architecture rules are tested by
actually invoking dependency-cruiser against fixture repositories, not by
asserting on prose — see `test/architecture.test.ts`.

## Local documentation guidance

Next.js caching, routing, and data-fetching behavior changes between
major versions. For any version-sensitive behavior, check the installed
version first (`node_modules/next/package.json`) and prefer documentation
shipped with that installed version
(`node_modules/next/dist/docs/`, when present) over general training
knowledge, which may describe a different major version. Do not encode
assumptions about future Next.js versions into Rules or code. See
`.claude/rules/nextjs.md`.

## Agent behavior expectations

- Write all file content (code, comments, docs, commit messages, PR
  descriptions) in English only, no matter what language the developer
  is chatting in — the language rule is about what gets persisted to the
  repo, not about the conversation.
- Never commit or push directly to `main`/`master`. Always create a
  branch and open a PR — this is enforced by a `PreToolUse` hook
  (`.claude/hooks/protect-main-branch.sh`); do not attempt to bypass it.
- Branch names use `feat/`, `fix/`, `chore/`, or `hotfix/` + a kebab-case
  description (e.g. `feat/parallel-routes-demo`) — see
  `kszaffner/nextjs-claude-starter`'s `docs/workflow.md` for the full
  rationale.
- Classify every task SMALL/NORMAL/LARGE and follow the matching workflow
  in `CLAUDE.md` / `.claude/skills/new-feature/SKILL.md`. When unsure,
  pick the higher level.
- LARGE tasks require explicit developer approval before implementation —
  do not start implementing first and ask forgiveness after.
- Never state a check (lint/typecheck/test/build/architecture) passed
  without having actually run it in this session.
- Never modify a test to make an incorrect implementation look correct —
  see `.claude/skills/test-loop/SKILL.md`.
- Use `.claude/skills/explore` (forked) for large/unclear repository
  exploration instead of reading broadly in the main context; use
  targeted `@` references and narrow shell commands otherwise.
- Knowledge (`.claude/knowledge/`) is optional and index-first — never
  auto-load the full base, always ask before loading or saving. If it
  isn't present or is disabled, don't mention it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
