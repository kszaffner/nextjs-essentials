# CLAUDE.md

## Project identity

`nextjs-essentials` — a showcase application covering **every major
Next.js feature**, built on the **latest major version** currently
available. Its purpose is to serve as an interview-readiness reference:
each feature gets its own isolated, clearly presented demo.

Content requirements:

- Must reflect the **current, official Next.js documentation** (App
  Router) — no legacy/Pages Router patterns or outdated caching APIs.
- Every significant Next.js feature gets a **dedicated route/section** in
  the app: routing, rendering strategies (SSR/SSG/ISR/PPR), Server vs
  Client Components, Server Actions, middleware/proxy, data fetching,
  caching (`use cache`, `cacheLife`, `cacheTag`, `revalidatePath`/
  `revalidateTag`), layouts/templates, streaming + Suspense, parallel and
  intercepting routes, error handling (`error.tsx`, `not-found.tsx`),
  metadata API, image/font optimization, etc.
- Beyond the happy path, demos must cover **edge cases and pitfalls**
  that come up in real technical interviews (cache behavior differences
  client vs. server, hydration mismatches, Server Action execution order,
  streaming boundaries, and similar).
- Scope should be broad enough to cover what a Next.js technical
  interview could reasonably ask.
- Keep the app updated to each new Next.js major version rather than
  freezing it at whatever version it was built on.

## Engineering workflow source

The `.claude/`, `AGENTS.md`, and `ai-workflow-config/` files in this repo
are copied from the dedicated starter repository
**`kszaffner/nextjs-claude-starter`** ("AI-native engineering starter for
Next.js projects using Claude Code — Rules, Skills, Knowledge,
architecture enforcement, verification, and code review"). That repo is
the source of truth for the workflow itself; this file only states how it
applies here. Its extended docs (`docs/`) and its own worked example
(`example/`, `src/`) are not duplicated into this repo — consult the
source repo directly when the *why* behind a rule or skill isn't
self-evident from the file.

The workflow's job in this repo specifically is to keep the app the best
possible reference implementation as features are added: sound
**architecture**, strong **performance** (rendering strategy, caching,
bundle size, image/font handling), and adherence to current **best
practices and tooling** — not just "does it run."

## Architecture summary

Feature-oriented, three layers (see `.claude/rules/architecture.md` for
the enforced rationale):

```text
src/
├── app/       # routes/layouts per showcased feature — stays thin
├── modules/   # one module per feature demo, public API via index.ts
└── shared/    # genuinely reusable, feature-agnostic code only
```

`shared → modules` and reaching into another module's internals are
forbidden and mechanically enforced via
`ai-workflow-config/dependency-cruiser.cjs`. This layout does not exist
yet in this repo — scaffold the Next.js app deliberately against this
convention rather than keeping `create-next-app`'s default structure
unmodified.

## Engineering workflow

Classify every task as **SMALL**, **NORMAL**, or **LARGE**. If unsure,
pick the higher level.

- **SMALL** (copy tweak, rename, obvious small fix): Understand → Implement → Verify.
- **NORMAL** (new feature demo, moderate bug fix, refactor within a module): Understand → Explore → Plan → Implement → Verify → Code Review.
- **LARGE** (new feature category, cross-module or infra change, app scaffolding): Understand → Explore → Knowledge Check → Architecture → Plan → **Developer Approval** → Implement → Verify → Code Review → Fix/Verify/Review loop → Knowledge Review.

**LARGE tasks require explicit developer approval before implementation.**
If the plan must change materially mid-implementation: stop, explain
what/why, present the revised plan, get approval again.

Run this via `/new-feature` (see `.claude/skills/new-feature/SKILL.md`
for the full procedure — do not duplicate it here).

## Key commands

```text
pnpm dev                    # dev server
pnpm lint                   # eslint
pnpm typecheck              # tsc --noEmit
pnpm test                   # vitest
pnpm architecture:check     # dependency-cruiser
pnpm build                  # production build
pnpm check                  # lint + typecheck + architecture:check + test
```

> Not wired up yet — no `package.json`/Next.js app exists in this repo
> yet. Add these scripts once the app is scaffolded.

Never claim a check passed without actually running it.

## Non-negotiable rules

- All file content (code, comments, docs, commit messages, PR
  descriptions, config) is written in **English only**, regardless of
  what language the developer uses to talk to Claude. This applies to
  what gets written to files/history, not to the conversation itself —
  reply to the developer in whatever language they use.
- Never commit or push directly to `main`/`master`. Always work on a
  `feat/`, `fix/`, `chore/`, or `hotfix/` branch and open a PR. This is
  enforced mechanically by a `PreToolUse` hook
  (`.claude/hooks/protect-main-branch.sh`, registered in
  `.claude/settings.json`) that blocks `git commit`/`git push` against a
  protected branch — do not rely on remembering this instead of the hook,
  and do not work around the hook if it blocks something.
- Full rules: `.claude/rules/` (architecture, react, nextjs, typescript,
  testing, security) — loaded selectively by file path, do not restate
  them here.
- No `shared → modules` dependency. No reaching into another module's
  internals — use its `index.ts` public API. No circular dependencies.
- LARGE tasks: no implementation before developer approval.
- Never modify a test to hide an incorrect implementation.
- Deterministic work (lint/typecheck/test/build/architecture check) uses
  tooling; reasoning work (tradeoffs, requirements, security judgment,
  whether an abstraction is justified) uses Claude. Don't swap the two.
- For any version-sensitive Next.js behavior (caching, routing, data
  fetching), check the installed version first
  (`node_modules/next/package.json`) and prefer documentation shipped
  with that installed version over general training knowledge, which may
  describe a different major version.

## Knowledge behavior

If `.claude/knowledge/` exists and isn't disabled: check the index
(`index.md`) for relevant topics before a task, ask before loading
("Do you want to load the knowledge base for this task?"), and ask before
saving after a task with a meaningful WHY-level change. Never auto-load
the whole base. Full flow: `.claude/skills/knowledge/SKILL.md`. If
Knowledge doesn't exist or is disabled, skip all of this silently — don't
ask.

## Context efficiency

Load the minimum context required to make the correct decision: scoped
Rules (via `paths:`), on-demand Skills, index-first Knowledge, targeted
`@` references and shell commands over broad dumps, forked `/explore` for
large repository searches instead of reading everything inline.
