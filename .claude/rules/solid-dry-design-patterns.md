---
description: SOLID, DRY, and when a JS/TS design pattern is actually earning its complexity.
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
---

# SOLID, DRY, and design patterns

WHAT must be true. This governs how an individual function/class/module is designed internally —
see each scope's own `architecture` item for folder/module-boundary rules, a different level.

## SOLID, applied practically (not academically)

- **Single Responsibility** — a function/class/module should have one reason to change. If
  describing what it does needs "and," it's probably two things. This is the single most
  load-bearing principle here; the other four matter far less if this one is violated.
- **Open/Closed** — prefer adding a new case (a new function, a new entry in a strategy map) over
  editing a long `if`/`switch` chain every time a new variant appears, once there are enough
  variants that the chain itself is the recurring source of changes/bugs. Don't apply this
  pre-emptively to code with one or two cases — that's speculative abstraction, not the principle.
- **Liskov Substitution** — a subtype/implementation must be usable anywhere its base type is
  expected without the caller needing to know which concrete type it got. If a caller has to
  branch on which implementation it received, the abstraction is leaking.
- **Interface Segregation** — a consumer shouldn't be forced to depend on methods/props it doesn't
  use. A component prop or function parameter that's only ever partially used by every caller is a
  sign the interface should be split.
- **Dependency Inversion** — a module should depend on an abstraction (a function signature, an
  interface) it's handed, not construct or import a concrete implementation of a collaborator
  directly, when that collaborator is something a caller might reasonably need to vary (a data
  source, a clock, an external service client). Don't invert a dependency that will only ever have
  one real implementation — that's ceremony without benefit.

## DRY — don't repeat *knowledge*, not don't repeat *text*

DRY means a single piece of business knowledge/logic should have exactly one authoritative
expression in the codebase, not that no two code blocks may ever look similar. Two call sites that
happen to look alike today but represent genuinely independent business rules should **not** be
merged into a shared helper — a future change to one that doesn't apply to the other then has to
un-merge them under pressure. Extract a shared abstraction only once the duplication represents the
same underlying rule/decision, not just similar-looking code.

## Design patterns: use only where the problem actually calls for one

A pattern's job is to name a known solution shape so it's recognizable — not to make code look more
sophisticated. Reach for one only when the specific problem it solves is actually present:

- **Factory** — object construction has real conditional complexity (which concrete type to build
  depends on runtime input). Don't wrap a single `new X()` call in a factory function "for
  consistency."
- **Strategy** — several interchangeable algorithms/behaviors need to be selected and swapped at
  runtime (e.g. different validation rules per plan tier). A plain object/`Map` of functions keyed
  by the selector is usually sufficient; a full class hierarchy is rarely needed in JS/TS.
- **Observer / pub-sub** — multiple independent parts of the system need to react to an event
  without the event source knowing who's listening. In a UI, prefer the framework's own state/event
  model (props, context, a query library's cache invalidation) over a hand-rolled event emitter
  unless something genuinely doesn't fit that model.
- **Decorator / higher-order function** — behavior needs to be layered onto something (logging,
  memoization, retry) without modifying its own definition, and the same layering is reused across
  multiple targets. A one-off wrapper used in exactly one place doesn't need the pattern's name to
  justify existing — it's just a wrapper.
- **Adapter** — an external/legacy interface needs to be reshaped to match what the rest of the
  codebase expects, isolating that mismatch at one boundary instead of letting every call site
  accommodate it individually.

## Signal a pattern is the wrong call

- Introducing a pattern to handle a case ("what if we need a second implementation someday") that
  doesn't exist yet — see `.claude/rules/behavior-over-implementation.md`'s adjacent point about
  not testing hypothetical behavior; the same restraint applies to designing for it.
- A pattern whose supporting scaffolding (interfaces, factories, base classes) is larger than the
  logic it's organizing.
