---
description: Module boundaries, dependency direction, and public APIs for the feature-oriented architecture.
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Architecture

WHAT must be true.

## Structure

- `src/app` — routes, layouts, route-level composition (e.g. router route
  elements). Stays thin: no business logic, only composition of module
  public APIs.
- `src/modules/<name>` — business features. Owns its logic and UI.
- `src/shared` — genuinely reusable, business-agnostic code only.

## Dependency direction

Allowed:

- `app → modules`
- `app → shared`
- `modules → shared`
- `module A → module B` (when it reflects a real business relationship —
  see "Direct dependency vs. page-level composition" below)

Forbidden:

- `shared → modules` (shared code must never depend on a business module —
  if it needs to, it isn't shared)
- `module A → module B/<internal-file>` (must go through B's public API)
- circular dependencies of any length (`A → B → A`, or longer cycles)

These are enforced mechanically by an architecture-enforcement tool (see
`claude-config/dependency-cruiser.cjs`) — do not rely on review alone to catch
violations, run the check.

## Direct dependency vs. page-level composition

Before making module A depend on module B, ask whether the relationship
is real ownership (B is conceptually part of what A does — e.g. `orders`
depending on `products` because an order references products) or whether
A and B are peers that merely need to appear together on the same
screen (e.g. a checkout page that also shows wishlist items). Only the
first case justifies a direct `module A → module B` dependency.

For peers, compose them at the `app` layer instead of coupling one
module to the other:

```text
// peers — compose in the route, don't couple the modules
CheckoutPage (src/app/checkout/page.tsx)
 ├── Checkout   (@/modules/checkout)
 └── Wishlist   (@/modules/wishlist)

// real ownership — direct dependency through the public API is correct
Checkout (@/modules/checkout) → Product (@/modules/products)
```

Mechanically, the architecture-enforcement tool allows either shape as
long as it goes through a public API — this distinction is a judgment
call, not something the tool enforces, so make it deliberately rather
than defaulting to a direct dependency whenever two modules happen to
both be needed by the same feature.

## Public APIs

Each module exposes its public surface through `index.ts`. Consumers
(other modules, `app`) import only from `@/modules/<name>`, never from
`@/modules/<name>/components/...` or other internal paths. A module's
internal file layout (`components/`, `lib/`, `hooks/`, etc.) is
implementation detail and may change freely as long as the public API
(`index.ts`) stays stable.

## Ownership

A module owns the business logic and UI for its feature. If two modules
need to share logic that has no business meaning of its own (e.g. currency
formatting, a generic button), move it to `shared`. If it has business
meaning tied to one feature, it stays in that module even if another
module currently needs it — expose it through the owning module's public
API instead of duplicating or relocating it to `shared`.

## Progressive architecture

Start minimal. A new module does not need `components/`, `lib/`,
`hooks/`, `types/`, and `constants/` on day one — create only the
directories the module actually needs right now. Add structure when
complexity actually requires it (e.g. split `types.ts` into `types/` once
it outgrows one file), not in anticipation of future complexity. Do not
introduce a layer, abstraction, or directory for theoretical purity.
