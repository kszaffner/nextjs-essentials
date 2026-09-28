---
description: Error boundary placement and scope rules for rendering errors.
paths:
  - "src/**/*.tsx"
---

# Error boundaries

WHAT must be true.

## What a boundary actually catches

An Error Boundary catches errors thrown during rendering, in lifecycle
methods, and in constructors of the component tree below it — nothing
else. It does **not** catch errors in event handlers, async code
(`setTimeout`, a `.then()` callback), server-side rendering, or errors
thrown in the boundary component itself. Treating a boundary as a
catch-all for "anything that can go wrong in this component" is the
most common misuse — most runtime errors in a typical app happen in
event handlers and async code, which need explicit `try`/`catch`
instead (see below), not a boundary.

## Placement: isolate failure, don't hide the whole app

Place boundaries around independently-failing sections (a widget, a
route, a third-party embed), not only once at the app root. A single
root-level boundary means any unrelated component's render error takes
down the entire UI instead of just the section that broke — the same
"blast radius" reasoning applies here as anywhere else: a failure
should degrade the smallest reasonable unit, not everything.

## Event handlers and async code need their own try/catch

Since a boundary can't see these, wrap the risky call directly and
handle the failure locally (show inline error state, call the
monitoring integration explicitly) rather than relying on a boundary
that will never fire. Converting an async error into a render error
that a boundary *can* catch (e.g. `setState` inside the catch block to
throw during the next render) is a valid escape hatch when you
specifically want the boundary's fallback UI to take over.

## Fallback UI must be genuinely usable

A fallback isn't just "doesn't crash" — it should tell the user
something is wrong in terms they understand and, where possible, offer
a way forward (retry, reload, go back), not a blank div or a raw error
message that assumes a developer is reading it.

## Reset state deliberately

A boundary that has caught an error stays in its errored state until
something explicitly resets it (a key change that remounts the tree, or
a library like `react-error-boundary`'s `resetKeys`/`onReset`). Don't
assume navigating away and back silently clears it unless the
boundary's key actually changes.
