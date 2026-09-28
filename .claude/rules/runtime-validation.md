---
description: Runtime validation at trust boundaries, using Zod instead of casting.
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Runtime validation

WHAT must be true.

## Types don't survive to runtime

TypeScript's type system is erased during compilation — `as SomeType` and
a type annotation are both compile-time-only promises to the compiler,
not a runtime check. Nothing stops malformed data from flowing through
code that "type-checks" if it was cast rather than actually validated.
See `.claude/rules/strict-typing.md`'s Boundaries section: data crossing a
trust boundary must be validated/parsed, not just cast. This item names
the tool.

## Use Zod at every trust boundary

Default to [Zod](https://zod.dev) for parsing and validating data that
crosses into your code from outside its control:

- **Forms** — client-side validation for UX, and the same (or an
  equivalent server-side) schema re-validating on submit. Client-side
  validation is never a security control on its own — see
  `.claude/rules/trust-boundary-validation.md` and, for a client-only
  SPA specifically, `.claude/rules/security-rules.md`.
- **API route handlers / Server Actions** — parse the request body,
  query/search params, and headers with a schema before using any of it.
- **Environment variables** — parse `process.env` (or equivalent) through
  a schema once at startup, so a missing or malformed env var fails fast
  and loudly instead of surfacing as an obscure runtime error later.
- **External API responses** — never trust that a third-party or internal
  service returns exactly the shape its documentation claims; parse the
  response before using it.

## Derive the type from the schema, not the other way around

```ts
import { z } from "zod";

const OrderSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "paid", "cancelled"]),
  total: z.number().nonnegative(),
});

// The domain type is inferred FROM the schema — one source of truth,
// not a hand-written type that can silently drift from the validator.
type Order = z.infer<typeof OrderSchema>;

function receiveOrder(payload: unknown): Order {
  return OrderSchema.parse(payload); // throws on invalid input
}
```

Writing a TypeScript `interface`/`type` by hand *and* a separate
validator for the same shape is the failure mode this avoids — the two
inevitably drift, and the validator (not the hand-written type) is the
one actually enforced at runtime. `z.infer` keeps them identical by
construction.

## Where not to reach for this

- Don't add a schema for data that never leaves a fully-typed, in-process
  boundary (e.g. a function called only with values your own code just
  constructed) — that's what the type system already covers.
- Don't validate the same payload twice at the same boundary out of
  caution; validate once, at the point where trust actually changes.
