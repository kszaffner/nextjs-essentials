---
description: Design tokens, style colocation, and CSS architecture boundaries (methodology-agnostic).
paths:
  - "**/*.css"
---

# CSS

WHAT must be true. No CSS methodology (Tailwind, CSS Modules, vanilla-extract,
styled-components, etc.) is assumed here, and no class-naming convention is
mandated. This covers only what's decidable independent of that choice: where
design tokens live, how styles are colocated, and who owns what.

## Token architecture

Global design tokens live in one place, one file per category, aggregated by
a single entry point (adapt the exact path to the project's structure):

```text
<shared>/styles/
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

This is the *only* cross-module/cross-feature style contract — business-agnostic
only, same ownership rule as any other shared code.

### Naming

Format: `--<category>-<name>[-<step-or-variant>]`. The category prefix is
mandatory and fixed; prefer semantic scale steps (`sm/md/lg`, `1..8`) over
values baked into the name, so values can change without renaming anything
that uses them.

| Category | Prefix | Examples |
|---|---|---|
| Color | `--color-` | `--color-bg`, `--color-primary`, `--color-danger` |
| Spacing | `--space-` | `--space-1` … `--space-8` |
| Typography | `--font-` | `--font-size-sm/base/lg`, `--font-weight-regular/medium/bold` |
| Radius | `--radius-` | `--radius-sm/md/lg/full` |
| Shadow | `--shadow-` | `--shadow-sm/md/lg` |
| Z-index | `--z-` | Named layers (`--z-dropdown`, `--z-modal`), never raw numbers |
| Motion | `--duration-`, `--ease-` | `--duration-fast/base/slow`, `--ease-standard` |

No component-specific tokens at the global layer (`--color-product-card-border`
is wrong) — either reuse an existing semantic token or keep the value local.

## Colocation

- **Global**: the single cross-feature contract described above. Never put a
  feature-specific concept here.
- **Feature-scoped styles**: colocated next to the component they style —
  this holds regardless of methodology.
- **Feature-local token layers**: a feature may keep its own private token
  file for values reused *within* it but with no cross-feature meaning.
  Other features never import these.

## When to add, reuse, or keep a value local

- **Reuse** an existing global token if a semantically equivalent one
  already exists.
- **Add** a new global token only when the value is genuinely cross-feature
  (used, or clearly about to be used, by 2+ features) and represents a
  stable design decision. Name it semantically, not by appearance or by
  consumer.
- **Keep it local** when it's a one-off with no evidence of reuse — don't
  globalize preemptively.
- Promoting a local value to a global token is a deliberate, visible step,
  not something done silently mid-task.
