# CLAUDE.md

## Project identity

`nextjs-essentials` is a complete, interview-ready compendium of the
**Next.js App Router**, written in TypeScript. Every feature lives in its
own isolated route/module, and every topic page has three sections:

1. **Basics** — how the feature works, with a minimal working demo.
2. **Edge cases** — pitfalls, surprising behavior, and failure modes.
3. **Interview questions** — questions a Next.js technical interview could
   reasonably ask, with concise answers grounded in the demo.

Content must reflect the current official documentation
(nextjs.org/docs, App Router). Legacy Pages Router patterns may appear
only as a deliberate, clearly labeled contrast. For any version-sensitive
behavior (caching, routing, data fetching, proxy), check the installed
version in `node_modules/next/package.json` and prefer the docs shipped
with that version (`node_modules/next/dist/docs/`) over general
knowledge.

All required context is recorded in this repository. Do not assume access
to any other repository.

## Scope

### In scope

#### App Router fundamentals

- File-system routing and file conventions: `page`, `layout`, `template`,
  `loading`, `error`, `not-found`, `global-error`, route groups `(group)`,
  private folders `_folder`
- Dynamic segments `[slug]`, catch-all `[...slug]`, optional catch-all
  `[[...slug]]`
- Parallel routes (`@slot`) and intercepting routes (`(.)folder`)
- Navigation: `<Link>`, `useRouter`, `usePathname`, `useSearchParams`,
  prefetching

#### Rendering and strategies

- Static rendering (SSG) vs dynamic rendering (SSR): when Next.js picks each
- Incremental Static Regeneration (ISR): `revalidate`, on-demand
  revalidation
- Partial Prerendering (PPR): `"use cache"`, `cacheLife`, `cacheTag`
- Streaming SSR and Suspense boundaries as a Next.js mechanism
  (`loading.tsx`, `<Suspense>` in the Server Component tree)

#### Server Components vs Client Components

- The `"use client"` boundary: prop serialization rules, and what can and
  cannot cross it
- Composition: passing Client Components as `children` to Server Components
- Server Components as the default, and common pitfalls such as event
  handlers or state in a Server Component

#### Data fetching and caching

- `fetch()` with Next.js extensions: `cache`, `next.revalidate`,
  `next.tags`
- The mental model of Data Cache, Full Route Cache, Router Cache, and
  Request Memoization
- Parallel vs sequential fetching and the waterfall problem
- `revalidatePath` / `revalidateTag`
- Migrating from `unstable_cache` to `"use cache"` (Cache Components)

#### Server Actions and forms

- `"use server"`, invoked from Client and Server Components
- `<form action={...}>` integration and progressive enhancement
- `useActionState`, `useFormStatus`, `useOptimistic` with Server Actions
- Validation, error handling, redirect after an action

#### Advanced routing

- Route Handlers (`app/api`): GET/POST/etc., `NextRequest`/`NextResponse`
- Routing Middleware / `proxy.ts`: intercepting requests before the cache,
  rewrites/redirects, personalization
- Edge Runtime vs Node.js runtime for middleware/proxy

#### Metadata and SEO

- `generateMetadata` (static and dynamic), `metadataBase`
- `sitemap.ts`, `robots.ts`, generated Open Graph images
  (`opengraph-image.tsx`)

#### Next.js-specific optimization and performance

- `next/image`: lazy loading, `srcset`, `priority`, LCP
- `next/font`: self-hosting, avoiding layout shift
- `next/dynamic`: code splitting, `ssr: false`
- Turbopack vs Webpack: the mental model and when to use each
- Bundle analysis and Core Web Vitals in a Next.js context

#### Error handling and edge cases

- `error.tsx` vs `global-error.tsx`: App Router error boundary scope
- `not-found.tsx` and `notFound()`
- Error handling in Server Actions and Route Handlers

#### Testing in a Next.js context

- Testing Server Components vs Client Components
- Mocking `fetch`/cache in tests, testing Server Actions

### React APIs allowed as topics

Only React APIs that are tied to the Next.js App Router rendering and
data model:

- Server Components vs Client Components
- `useActionState`, `useOptimistic`, `useFormStatus` (with Server Actions)
- `use()` with Server Components and Suspense

### Out of scope (permanent exclusions)

This project does not cover generic, framework-independent React engine
APIs. Do not create modules, routes, or sections for these topics, not
even as an introduction or refresher:

- `useState`, `useEffect`, `useLayoutEffect`, `useRef`, `useContext`,
  `useReducer`, `useMemo`, `useCallback`, `useTransition`,
  `useDeferredValue`, `useId`, `useSyncExternalStore`,
  `useImperativeHandle`
- Custom hooks, render props, `forwardRef`
- Controlled vs uncontrolled components
- `memo`, `lazy`, generic code splitting (Next.js `next/dynamic` stays in
  scope)
- Profiling
- Unit testing of components in general (Next.js-specific testing stays
  in scope)
- Accessibility (a11y) as a topic

If one of these topics is needed only as background for a Next.js
mechanism (for example, Suspense as a prerequisite for streaming), mention
it in one sentence without a dedicated section.

These exclusions limit what the app *teaches*, not how its code is
written. Engineering rules under `.claude/rules/` (for example
`component-fundamentals.md` on state, effects, memoization, and
accessibility) still apply to every line of code in the demos.

### Proposed structure

Feature-oriented, three layers (enforced rationale in
`.claude/rules/architecture.md`):

- `src/app/` — one routing segment per topic, all under `src/app/[lang]/`
  (`pl` default, `en`; `api/`, `sitemap`, `robots`, `global-error` stay at the root). Stays thin: route files
  compose a module's public API. Next.js file conventions that are
  themselves the subject of a demo (`@slot`, `(.)folder`, `error.tsx`,
  `loading.tsx`, …) naturally live here.
- `src/modules/<topic>/` — the demo UI, content (Basics / Edge cases /
  Interview questions), and server code for one topic, exposed only via
  `index.ts`.
- `src/shared/` — genuinely topic-agnostic code (topic page template,
  layout primitives, design tokens).

```text
src/
├── proxy.ts                        # Routing Middleware / proxy (demo: advanced-routing/proxy)
├── app/
│   ├── layout.tsx                  # root layout + topic navigation
│   ├── page.tsx                    # index of all topics
│   ├── global-error.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── fundamentals/
│   │   ├── file-conventions/       # page/layout/template/loading/error/not-found, (groups), _private
│   │   ├── dynamic-segments/       # [slug], [...slug], [[...slug]]
│   │   ├── parallel-routes/        # @slot
│   │   ├── intercepting-routes/    # (.)folder
│   │   └── navigation/             # Link, useRouter, usePathname, useSearchParams, prefetching
│   ├── rendering/
│   │   ├── static-vs-dynamic/
│   │   ├── isr/
│   │   ├── ppr/
│   │   └── streaming/
│   ├── components/
│   │   ├── use-client-boundary/    # serialization rules
│   │   ├── composition/            # Client Components as children
│   │   └── pitfalls/
│   ├── data/
│   │   ├── fetch-extensions/
│   │   ├── cache-layers/           # Data / Full Route / Router cache, memoization
│   │   ├── parallel-vs-sequential/
│   │   ├── revalidation/           # revalidatePath / revalidateTag
│   │   └── use-cache-migration/    # unstable_cache -> "use cache"
│   ├── server-actions/
│   │   ├── basics/
│   │   ├── forms/                  # progressive enhancement
│   │   ├── form-hooks/             # useActionState, useFormStatus, useOptimistic
│   │   └── validation-and-redirect/
│   ├── advanced-routing/
│   │   ├── route-handlers/
│   │   ├── proxy/
│   │   └── runtimes/               # Edge vs Node.js
│   ├── api/                        # Route Handlers used by the demos
│   ├── metadata/
│   │   ├── generate-metadata/
│   │   ├── sitemap-robots/
│   │   └── og-images/              # opengraph-image.tsx
│   ├── optimization/
│   │   ├── image/
│   │   ├── font/
│   │   ├── dynamic-import/
│   │   ├── bundlers/               # Turbopack vs Webpack
│   │   └── web-vitals/             # bundle analysis, Core Web Vitals
│   ├── errors/
│   │   ├── error-boundaries/       # error.tsx vs global-error.tsx
│   │   ├── not-found/              # not-found.tsx, notFound()
│   │   └── actions-and-handlers/
│   └── testing/
│       ├── server-vs-client/
│       └── mocking-and-actions/
├── modules/                        # one module per topic, public API via index.ts
└── shared/                         # topic-agnostic code only
```

## Stack

- **Next.js**: latest stable version (currently 16.3.6), App Router only
  (no `pages/`), Turbopack (default bundler)
- **`next.config.ts`**: `cacheComponents: true` (current caching model,
  required for `"use cache"`/PPR demos), `reactCompiler: true`
- **React**: 19.2
- **TypeScript**: strict mode
- **ESLint**: flat config with `eslint-config-next` (core-web-vitals +
  typescript)
- **Styling**: CSS Modules + design tokens as CSS custom properties in
  `src/shared/styles/` (see `.claude/rules/design-tokens.md`); no Tailwind
- **Package manager**: pnpm
- **Error monitoring**: Sentry (`@sentry/nextjs`) — wired up (S0-09): `src/instrumentation.ts`,
  `src/instrumentation-client.ts`, `src/sentry.{server,edge}.config.ts`,
  `withSentryConfig` in `next.config.ts`; env vars in `.env.example`
- **Structure**: `src/` directory, one route segment per topic (see above)
- **Deployment target**: Vercel

## Project status

- Features are implemented separately and iteratively. `ROADMAP.md` is
  the living plan and progress log: check it before starting work, and
  update it (status + change log) in the same change that adds, finishes,
  reorders, or drops an item.
- All 37 topic pages from the proposed structure are implemented, each
  with Basics, Edge cases, interview questions, and a live demo (stages 1
  to 10 of `ROADMAP.md`). The one open item is the first Vercel deployment
  (S0-07), which needs the project connected to the GitHub repo.
- New work now means improving or extending existing topics, or adding one
  from the Backlog in `ROADMAP.md`. Keep to the rules in "How work
  happens here", and verify behavior claims against a production build
  (`pnpm build` then `pnpm start`) instead of writing them from memory.

## Key commands

```text
pnpm dev          # dev server (Turbopack)
pnpm build        # production build
pnpm lint         # eslint
pnpm typecheck    # next typegen (route types, e.g. LayoutProps) + tsc --noEmit
pnpm test         # vitest run (jsdom, Testing Library)
pnpm test:watch   # vitest in watch mode
pnpm architecture:check  # dependency-cruiser against .claude/rules/architecture.md
pnpm check        # lint + typecheck + architecture:check + test
pnpm analyze      # bundle analyzer (next experimental-analyze, Turbopack only)
```

Vitest cannot render `async` Server Components; unit-test the synchronous
ones and cover `async` ones with E2E. Never claim a check passed without
actually running it.

## How work happens here

Read every rule under `.claude/rules/` whose `paths:` frontmatter matches
the file(s) you're about to change before writing code. Run the
`code-review` skill before considering a change done. See
`.claude/agents/README.md` for when (rarely) a specialized review agent
is worth reaching for on top of that.

### Rules

- **App Router conventions** (`.claude/rules/app-router.md`) — Server/client boundaries, Server Actions, data fetching & caching, routing & metadata, and streaming for the Next.js App Router.
- **App Router server-side security specifics** (`.claude/rules/security-rules.md`) — The parts of a Next.js App Router security model that aren't technology-independent — server-only module boundaries, Server Action and route handler input validation/authorization, and CSRF via the framework's built-in protections.
- **Design tokens and CSS ownership boundaries** (`.claude/rules/design-tokens.md`) — Where global design tokens live, how to name them, and when to promote a local style value to a global token — independent of any CSS methodology.
- **End-to-end testing with Playwright** (`.claude/rules/e2e-playwright.md`) — How to scope, select, and write Playwright end-to-end tests so the suite stays fast and stable — critical user journeys only, user-facing locators, no arbitrary waits.
- **Error boundaries for rendering errors** (`.claude/rules/error-boundaries.md`) — What an Error Boundary does and doesn't catch, where to place them, and why event-handler errors need explicit try/catch instead.
- **Error handling — rendering vs. Route Handlers vs. Server Actions** (`.claude/rules/error-handling.md`) — Rendering errors are caught by error.tsx/global-error.tsx boundaries, but Route Handlers and Server Actions need explicit try/catch, since nothing catches an uncaught throw in either for you.
- **Error monitoring and observability** (`.claude/rules/error-monitoring.md`) — Technology-independent principles for capturing and reporting runtime errors — what to capture, what context to attach, and what never to send to a monitoring service.
- **Fail clearly, never silently** (`.claude/rules/fail-clearly.md`) — Catch only where you can act, never swallow, distinguish expected from unexpected failures, and never leak internals to an external response.
- **Feature-oriented module architecture** (`.claude/rules/architecture.md`) — app/modules/shared layering with a mandatory public-API boundary (index.ts) per module, dependency direction rules, and "progressive architecture" (start minimal, add structure only when complexity requires it).
- **Git and project-text conventions** (`.claude/rules/conventions.md`) — English-only project text, small focused commits, and commit only when the user asks.
- **Integration testing** (`.claude/rules/integration-testing.md`) — How to write integration tests that exercise real collaboration across module/service boundaries, sized correctly in the test pyramid.
- **Naming conventions** (`.claude/rules/naming-conventions.md`) — camelCase / PascalCase / SCREAMING_SNAKE_CASE only, human-readable names, no abbreviations or single-letter identifiers.
- **OWASP Top 10 — verify currency, then cross-check** (`.claude/rules/owasp-top-10.md`) — Use the OWASP Top 10 as an audit framework without trusting a stale embedded snapshot of it.
- **React component, state, and effect fundamentals** (`.claude/rules/component-fundamentals.md`) — State locality and derivation, what useEffect is and isn't for, composition over prop-drilling, when (not) to memoize, and accessibility basics for interactive elements.
- **Sentry for Next.js (client, server, and edge)** (`.claude/rules/observability-sentry.md`) — Why Next.js needs three separate Sentry config entry points, and where each runtime's errors actually get captured.
- **SOLID, DRY, and common JS/TS design patterns** (`.claude/rules/solid-dry-design-patterns.md`) — Single responsibility, DRY applied to knowledge rather than text, and the few design patterns that actually earn their complexity.
- **Strict typing** (`.claude/rules/strict-typing.md`) — Strict mode discipline, avoiding any/as/non-null assertions, discriminated unions and exhaustive switches, validating instead of casting.
- **Test behavior, not implementation** (`.claude/rules/behavior-over-implementation.md`) — Test observable behavior, and never modify a test just to make an incorrect implementation pass.
- **Validate at runtime with Zod** (`.claude/rules/runtime-validation.md`) — Types are erased at runtime; validate data crossing a trust boundary with a Zod schema and infer types from it instead of casting.
- **Validate at trust boundaries** (`.claude/rules/trust-boundary-validation.md`) — Validate untrusted input where it enters, never treat client-side validation as security, check authentication and authorization separately, keep secrets out of source and client bundles.

### Skills

- **Code review** (`.claude/skills/code-review/`) — Review the current diff against `checklist.md`, `nextjs-checklist.md`, and every rule whose `paths:` matches a changed file. Use after implementing a change and before considering it done.
- **Explore** (`.claude/skills/explore/`) — Deep, isolated repository search (forked) for finding an existing pattern, convention, or usage across many files. Use for broad/unclear searches, not small lookups.
- **Project Knowledge Base management** (`.claude/skills/knowledge/`) — Assess, init, search, load, update, and compress the per-project Knowledge Base (index-first, always ask before load/save). Knowledge is not initialized yet, so none of its automatic behavior runs.

### Agents

- **Architecture reviewer** (`.claude/agents/architecture-reviewer.md`) — Read-only; the semantic architecture judgment calls a mechanical dependency check can't make.
- **Next.js App Router reviewer** (`.claude/agents/nextjs-reviewer.md`) — Read-only; correct App Router usage — routing, Server/Client Component placement, data fetching, Server Actions, metadata, and streaming.
- **Performance reviewer** (`.claude/agents/performance-reviewer.md`) — Read-only; Server/Client boundary cost, data fetching & caching, rendering cost, algorithmic efficiency.
- **Security auditor** (`.claude/agents/security-auditor.md`) — Read-only; Server Actions, route handlers, server/client data exposure, secrets, dependencies.

### Hooks (enforced automatically — not something to remember by hand)

Registered in `.claude/settings.json`. Require `jq` and `python3` on the
machine.

- **Credential guard** (`.claude/hooks/credential-guard.py`) — Blocks Write/Edit/NotebookEdit calls whose content matches a hardcoded credential pattern, redacting the match in its own message.
- **Protect main branch** (`.claude/hooks/protect-main-branch.sh`) — Blocks `git commit` and direct `git push` against main/master. Known false positive: `git push origin --delete <branch>` is also blocked while on main, so run branch deletes from a feature branch. Do not work around the hook otherwise.
- **Protect sensitive files** (`.claude/hooks/protect-files.sh`) — Blocks Write/Edit against env files, the lockfile (`pnpm-lock.yaml`), and `.git/`, with `.example`/`.sample`/`.template` exceptions.

## Adapting this file

`.claude/` and the workflow sections of this file were generated by
[`ai-engineering-system`](https://github.com/kszaffner/ai-engineering-system)
from a technology profile — treat them as a starting point for this
specific project, not a fixed artifact to keep regenerating in place.
Add project-specific rules under `.claude/rules/` as real needs come up.
Add a new specialized agent only for a demonstrated, recurring,
non-overlapping review need — never speculatively (see
`.claude/agents/README.md`).
