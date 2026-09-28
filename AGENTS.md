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

Before changing a file, read `CLAUDE.md`, check `ROADMAP.md` for the
current focus, and apply every rule under `.claude/rules/` whose `paths:`
matches that file. The hooks are Claude Code specific; if your tool does
not run them, follow what they enforce by hand: never commit or push to
`main`, never write hardcoded credentials, never edit env files, the
lockfile, or `.git/`.
