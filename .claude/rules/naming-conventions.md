---
description: Casing rules and the no-abbreviations, human-readable naming standard.
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
---

# Naming conventions

WHAT must be true.

## Only three casing styles exist in this codebase

- **camelCase** — variables, function/method names, parameters, object properties.
- **PascalCase** — classes, TypeScript types/interfaces/enums, React components (a component is a
  function, but it's named PascalCase because JSX requires it to distinguish a component from a
  DOM element).
- **SCREAMING_SNAKE_CASE** — true constants only: a value fixed at compile time that never varies
  per instance/call (`MAX_RETRIES`, `DEFAULT_TIMEOUT_MS`). A `const` binding that holds a
  computed value, a function, or anything re-derived per render/request is still camelCase — the
  casing signals immutability-as-a-fact-about-the-world, not the `const` keyword.

No other style (`snake_case`, `kebab-case`, Hungarian-notation prefixes, leading underscores for
"private") is used for identifiers. File names follow whatever convention the surrounding
directory already uses — this item governs identifiers in code, not file naming.

## No abbreviations

A name must be readable on its own, without the reader mentally expanding an abbreviation. Write
the full word: `request`, not `req`; `response`, not `res`; `error`, not `err`; `index`, not `idx`;
`temporary`, not `tmp`; `configuration`, not `cfg`/`conf`; `parameter`/`argument`, not `param`/
`arg`. This applies to parameters and loop variables exactly as much as top-level declarations — a
callback's `(e) => ...` should be `(event) => ...`, a reduce's `(acc, item) => ...` should be
`(accumulator, item) => ...`.

Established, unambiguous domain/industry terms are not abbreviations in this sense and don't need
expanding: `id`, `url`, `api`, `http`, `html`, `css`, `json`, `sql`, `ui`, `db` — these are the
actual full names of the concepts, not shortenings of a longer internal name. When genuinely
unsure whether a term counts as established vocabulary or a lazy shortening, spell it out — the
cost of an extra few characters is always lower than the cost of an ambiguous read.

## Single-letter names

A single-letter name is acceptable only where the scope is a few lines and the convention is
universally understood in context: a loop index (`i`, `j` in a classic numeric `for`), a generic
type parameter (`T`, `K`, `V` for a genuinely generic utility), or a mathematical formula
transcribed directly from a spec/paper. Anywhere the value has a real-world meaning (a user, an
order, a request), name it as that meaning, not a letter.

## Say what it is, not what it holds structurally

A name should describe the *meaning* of a value, not its type or container shape — `users`, not
`userArray` or `userList`; `isLoading`, not `loadingBool`. An exception: when a codebase
genuinely holds two different representations of related data side by side (a raw API response
and its parsed/validated form), a structural suffix that disambiguates them
(`userResponse` vs. `user`) is meaning, not noise — the rule is "don't restate the type when it
adds nothing," not "never mention shape."

## Booleans and functions read like the code that uses them

A boolean should read as a yes/no question at its use site: `isValid`, `hasPermission`,
`shouldRetry`, `canEdit` — not `valid`, `permission`, `retry`, `edit` (which read as commands or
nouns, not conditions). A function name should be a verb phrase describing what it does:
`calculateTotal`, `formatDate`, `validateInput` — not a noun (`totalCalculation`) unless it's
genuinely returning a thing rather than performing an action.
