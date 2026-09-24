---
description: Design tokens, style colocation, and CSS architecture boundaries (methodology-agnostic).
paths:
  - "src/**/*.css"
  - "src/**/*.tsx"
---

# CSS

WHAT must be true. No CSS methodology (Tailwind, CSS Modules,
vanilla-extract, styled-components, etc.) is chosen yet, and no class-
naming convention (BEM or otherwise) is mandated. This file covers only
what is decidable independent of that choice: where design tokens live,
how styles are colocated, and who owns what. See "Open decisions" below
for what is deliberately left unresolved.

## Open decisions (not yet made)

- **CSS methodology** — Tailwind vs. CSS Modules vs. vanilla-extract vs.
  styled-components vs. other is not chosen. Until it is:
  - Global design tokens still get defined as plain CSS custom
    properties (see below) — this format works under any candidate
    methodology.
  - Do not invent an ad hoc per-component styling mechanism (no trial
    `.module.css`, no styled-components, no one-off library). Keep
    using plain `className` strings as the codebase already does.
    Visual styling stays minimal/unimplemented until the methodology is
    decided — that is expected, not a bug to silently fix.
  - If a task genuinely requires real visual styling before the
    methodology is picked, stop and raise it with the developer instead
    of choosing one unilaterally — treat it like the Developer Approval
    gate for LARGE tasks in `CLAUDE.md`.
- **Class-naming convention** — not prescribed. Apply principles only,
  never a fixed system:
  - Locality: a class name must be unambiguous within the component or
    module that owns it.
  - Collision-resistance: don't rely on global uniqueness of short or
    generic names without a scoping mechanism.
  - Do not default to BEM, utility-first, or any other scheme on your
    own initiative — naming convention is coupled to the methodology
    choice above and deferred with it.

## Token architecture

### Where tokens live

Global design tokens live in `src/shared/styles/tokens/`, one file per
category, aggregated by a single entry point:

```text
src/shared/styles/
├── tokens/
│   ├── color.css
│   ├── space.css
│   ├── typography.css
│   ├── radius.css
│   ├── shadow.css
│   ├── breakpoints.css
│   ├── z-index.css
│   └── motion.css
└── index.css            # imports all token files; the one global entry point
```

`src/shared/styles/tokens/` is the *only* cross-module style contract —
same ownership rule as `shared/lib`/`shared/ui`: business-agnostic only.
`src/app` stays thin for styles too: at most one import of the global
stylesheet (e.g. from the root layout).

### Token taxonomy and naming

Format: `--<category>-<name>[-<step-or-variant>]`. The category prefix
is mandatory and fixed; the segment after it is the only open part —
prefer semantic scale steps (`sm/md/lg`, `1..8`) over values baked into
the name, so values can change without renaming anything that uses them.

| Category | Prefix | Examples |
|---|---|---|
| Color | `--color-` | `--color-bg`, `--color-primary`, `--color-primary-hover`, `--color-danger` |
| Spacing | `--space-` | `--space-1` … `--space-8` |
| Typography | `--font-` | `--font-size-sm/base/lg`, `--font-weight-regular/medium/bold`, `--line-height-tight/normal` |
| Radius | `--radius-` | `--radius-sm/md/lg/full` |
| Shadow | `--shadow-` | `--shadow-sm/md/lg` |
| Breakpoints | `--breakpoint-` | Documented reference values (e.g. `640px`). Raw `@media` queries cannot read `var()`, so these exist as a documented reference table, not as functioning custom properties inside media queries. |
| Z-index | `--z-` | Named layers (`--z-dropdown`, `--z-modal`, `--z-toast`), never raw numbers — prevents ad hoc escalation. |
| Motion | `--duration-`, `--ease-` | `--duration-fast/base/slow`, `--ease-standard` |

No component-specific tokens at the global layer — `--color-product-
card-border` is wrong; either reuse an existing semantic token
(`--color-border`) or keep the value local to the module/component.

## Colocation and folder structure

```text
src/
├── shared/styles/            # global tokens — see above
├── modules/
│   └── <name>/
│       ├── components/
│       │   └── SomeComponent.tsx   # any per-component style artifact lives beside it; exact mechanism = open decision
│       └── styles/                  # optional — see "module-local token layers"
│           └── tokens.*              # private to this module
```

- **Global (`shared/styles`)**: the single cross-module contract. Never
  put module-specific concepts here.
- **Module-scoped styles**: colocated inside
  `src/modules/<name>/components/`, next to the component they style —
  this principle holds regardless of methodology.
- **Module-local token layers**: a module may keep its own private
  token file (`src/modules/<name>/styles/tokens.*`) for values reused
  *within* that module but with no cross-module meaning. Other modules
  never import these — same boundary as reaching into another module's
  internals instead of its `index.ts`.

## Ownership & boundaries

- Global tokens follow the same ownership test as `shared` code (see
  `.claude/rules/architecture.md` § Ownership): if a value has business
  meaning tied to one feature, it does not belong in
  `shared/styles/tokens/`.
- A module must not read another module's local token layer — the
  styling equivalent of `module A → module B/<internal-file>`, which is
  forbidden for code.
- Promoting a module-local value to a global token is a deliberate,
  visible step, not something done silently mid-task. Trigger: the same
  raw value is genuinely needed in a second module. Then decide: (a)
  promote it to `shared/styles/tokens/`, reusing or adding a semantic
  token, or (b) recognize the overlap is coincidental and leave both
  local.
- Known gap: `pnpm architecture:check` (dependency-cruiser) only
  inspects `.ts`/`.tsx` imports today, not CSS `@import`/`url()`
  graphs. Module-local token privacy is a convention here, not
  mechanically enforced. Do not claim otherwise; a future addition to
  `ai-workflow-config/dependency-cruiser.cjs` could close this gap.

## When to add, reuse, or keep a value local

- **Reuse** an existing global token if a semantically equivalent one
  already exists — check `shared/styles/tokens/` before adding
  anything.
- **Add** a new global token only when the value is genuinely
  cross-module (used, or clearly about to be used, by 2+ modules) and
  represents a stable design decision. Name it semantically
  (`--color-danger`), not by appearance (`--color-red`) or by consumer
  (`--color-error-banner`).
- **Keep it local** (hardcoded, or in a module-local token file) when
  it's a one-off with no evidence of reuse — don't globalize
  preemptively, matching "Progressive architecture" in
  `.claude/rules/architecture.md`.
- **Introduce a module-local token layer** only once a module
  accumulates 3+ repeating style values — the same threshold used for
  splitting structure elsewhere in the codebase.
- When unsure whether something is global or module-scoped: does it
  represent the whole product's design system, or one feature's
  concern?
