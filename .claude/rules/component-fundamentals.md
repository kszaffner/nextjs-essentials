---
description: React component, state, and rendering rules.
paths:
  - "**/*.tsx"
  - "**/*.jsx"
---

# React

WHAT must be true for React code in this project.

## State

- Keep state as local as possible. Lift it only when two or more
  components genuinely need to share it.
- Derive values during render instead of storing them in state when they
  can be computed from existing props/state.
- Prefer the simplest primitive (`useState`, `useReducer`) that fits;
  don't reach for external state libraries for local UI state.

## Effects

- `useEffect` is for synchronizing with an external system (subscriptions,
  DOM APIs, non-React widgets, data fetching) — not for computing derived
  data.
- Prefer a dedicated data-fetching library (e.g. TanStack Query, SWR) over
  hand-rolled `useEffect` fetch/loading/error state once a component does
  more than one trivial fetch — it already solves caching, race
  conditions, and request deduplication correctly.
- If an effect only sets state from a prop/state change, that's usually a
  sign the value should be computed during render instead.
- Every effect needs a correct dependency array and a cleanup function
  when it subscribes to anything (including aborting an in-flight fetch).

## Composition

- Prefer composition (children, render props, slots) over prop-drilling
  configuration flags through many layers.
- A component should have one clear responsibility. If a component
  handles data fetching, business logic, and presentation, split it.

## Performance

- Don't reach for `useMemo`/`useCallback`/`React.memo` unless there is an
  actual, demonstrable performance problem — they add complexity and can
  mask it.
- Avoid fetching or computing more than a component actually renders.

## Accessibility

- Interactive elements use semantic HTML (`button`, `a`, `label`) before
  reaching for ARIA.
- Icon-only controls need an accessible name.
- Anything togglable (filters, tabs, disclosure) must expose its state via
  the appropriate ARIA attribute (e.g. `aria-pressed`, `aria-expanded`).
