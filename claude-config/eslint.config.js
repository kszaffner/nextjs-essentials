/**
 * ESLint flat config (ESLint 9+) enforcing naming conventions and
 * SOLID/DRY-adjacent complexity limits for a TypeScript project — see
 * .claude/rules/naming-conventions.md and
 * .claude/rules/solid-dry-design-patterns.md for the reasoning.
 *
 * IMPORTANT — read before enabling: the "SOLID/DRY" rules below are
 * PROXIES, not verification. ESLint checks syntax, not architecture; no
 * rule here confirms a class actually has a single responsibility or
 * that a dependency is genuinely inverted. Cyclomatic complexity,
 * function length, and duplicate functions are things that correlate
 * with SOLID/DRY violations in practice, and are worth flagging on
 * their own merits — but passing this config is not the same as
 * satisfying SOLID/DRY, and a human/code-review pass against the actual
 * rule items above is still required for that.
 *
 * TODO: `npm i -D eslint typescript-eslint eslint-plugin-sonarjs` before
 * using this. Uses ESLint's flat config format — for the legacy
 * `.eslintrc.json` format, translate `rules` below 1:1 and add
 * `"parser": "@typescript-eslint/parser"` / `"plugins": [...]` manually.
 */
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";

export default tseslint.config(
  {
    plugins: { sonarjs },
    rules: {
      // --- Naming conventions (fully enforced — see
      // .claude/rules/naming-conventions.md) ---
      "@typescript-eslint/naming-convention": [
        "error",
        // Types (class, interface, type alias, enum): PascalCase.
        { selector: "typeLike", format: ["PascalCase"] },
        // Variables: camelCase, PascalCase (React components / classes
        // assigned to a const), or UPPER_CASE (true constants) — the
        // one selector ESLint can't fully disambiguate on its own; a
        // human still confirms a given UPPER_CASE binding is actually
        // a fixed, compile-time constant and not just "a const."
        { selector: "variable", format: ["camelCase", "PascalCase", "UPPER_CASE"] },
        // Functions and methods: camelCase.
        { selector: ["function", "method"], format: ["camelCase"] },
        // Parameters: camelCase. Leading underscore allowed only for a
        // deliberately-unused parameter (a common, narrow exception —
        // not a loophole for abbreviating a used one).
        { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow" },
        // No `I`-prefixed interfaces (`IUser`) — plain PascalCase only,
        // consistent with .claude/rules/naming-conventions.md'
        // "no Hungarian-notation prefixes" rule.
        { selector: "interface", format: ["PascalCase"], custom: { regex: "^I[A-Z]", match: false } },
      ],

      // No single-letter identifiers outside the narrow exceptions
      // .claude/rules/naming-conventions.md allows (a numeric
      // loop index, a generic type parameter) — this rule can't tell
      // those apart automatically, so it's scoped loosely and expected
      // to need occasional inline `// eslint-disable-next-line` for a
      // genuine exception, not tightened further.
      "id-length": ["warn", { min: 2, exceptions: ["i", "j", "k", "_"] }],

      // --- SOLID/DRY-adjacent proxies (correlation, not proof — see
      // this file's header comment) ---
      complexity: ["warn", 10],
      "max-lines-per-function": ["warn", { max: 50, skipBlankLines: true, skipComments: true }],
      "max-params": ["warn", 4],
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/no-duplicate-string": ["warn", { threshold: 3 }],
    },
  },
);
