<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

This project uses [Claude Code](https://claude.com/claude-code). This file
exists for other agentic coding tools that look for `AGENTS.md` rather
than `CLAUDE.md`. It intentionally duplicates nothing — each topic below
is maintained in exactly one place:

| What                                                   | Where                                   |
| ------------------------------------------------------ | --------------------------------------- |
| Project goal, scope, permanent exclusions, stack       | [`CLAUDE.md`](./CLAUDE.md)              |
| Living plan: stages, features, status, change log      | [`ROADMAP.md`](./ROADMAP.md)            |
| Engineering rules (scoped by `paths:` frontmatter)     | [`.claude/rules/`](./.claude/rules/)    |
| Review procedure and checklists                        | [`.claude/skills/code-review/`](./.claude/skills/code-review/) |
| Review agents (architecture, Next.js, perf, security)  | [`.claude/agents/`](./.claude/agents/)  |
| Mechanical enforcement (branch, secrets, files)        | [`.claude/hooks/`](./.claude/hooks/) via [`.claude/settings.json`](./.claude/settings.json) |
| Tooling config templates (ESLint, dependency-cruiser, Sentry) | [`claude-config/`](./claude-config/) |
| Next.js docs for the installed version                 | `node_modules/next/dist/docs/` (after `pnpm install`) |

Before changing a file, read `CLAUDE.md`, check `ROADMAP.md` for the
current focus, and apply every rule under `.claude/rules/` whose `paths:`
matches that file. The hooks are Claude Code specific; if your tool does
not run them, follow what they enforce by hand: never commit or push to
`main`, never write hardcoded credentials, never edit env files, the
lockfile, or `.git/`.
