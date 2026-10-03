import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import sonarjs from "eslint-plugin-sonarjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Naming and SOLID/DRY proxy rules (.claude/rules/naming-conventions.md,
  // .claude/rules/solid-dry-design-patterns.md). The complexity rules are
  // proxies for SOLID/DRY, not proof; code review still judges the design.
  {
    plugins: { sonarjs },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "typeLike", format: ["PascalCase"] },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        // Route Handlers must export functions named after HTTP methods.
        {
          selector: "function",
          format: ["UPPER_CASE"],
          filter: {
            regex: "^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)$",
            match: true,
          },
        },
        // PascalCase functions are React components.
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
          filter: {
            regex: "^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)$",
            match: false,
          },
        },
        { selector: "method", format: ["camelCase"] },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
      ],
      "id-length": ["warn", { min: 2, exceptions: ["i", "j", "k", "_"] }],
      complexity: ["warn", 10],
      "max-lines-per-function": [
        "warn",
        { max: 50, skipBlankLines: true, skipComments: true },
      ],
      "max-params": ["warn", 4],
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/no-duplicate-string": ["warn", { threshold: 3 }],
    },
  },
  // Test suites are long by nature: a describe block holds many cases.
  {
    files: ["**/*.test.{ts,tsx}"],
    rules: { "max-lines-per-function": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Config templates, wired up later (ROADMAP S0-08, S0-09).
    "claude-config/**",
  ]),
]);

export default eslintConfig;
