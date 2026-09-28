# ROADMAP

Living plan and progress log for `nextjs-essentials`. Every feature is
implemented separately, one iteration at a time.

## How to use this file

- This is a working plan, not a contract. The order, contents, and scope
  of any item may change at any time: items can be added, edited,
  reordered, or dropped.
- IDs are stable and never reused. Reordering moves rows; it does not
  renumber them. A new item gets the next free number in its stage.
- A dropped item stays in the table with status `dropped` and a short
  reason in Notes, so the history remains readable.
- Update this file in the same change that adds, finishes, or re-scopes an
  item, and add a line to the [Change log](#change-log).
- Scope and exclusions are defined in `CLAUDE.md`. This file tracks only
  what to build and in what order.

Status values: `planned` · `in progress` · `done` · `blocked` · `dropped`

## Current focus

- **Now:** S0-03 (route skeleton)
- **Next:** S0-04 (root layout, topic navigation, index page)

## Stage 0: Foundation

| ID    | Item                                                                                  | Route / location     | Status  | Notes |
| ----- | ------------------------------------------------------------------------------------- | -------------------- | ------- | ----- |
| S0-01 | Add and review the `.claude/` workflow                                                | `.claude/`, `CLAUDE.md`, `AGENTS.md` | done    | Merged into `CLAUDE.md`, cross-references fixed |
| S0-02 | Initialize Next.js (latest stable, App Router, TypeScript strict, ESLint, `src/`, no `pages/`) | repo root  | done    | Next.js 16.3.6, `cacheComponents` + React Compiler on, CSS Modules + tokens |
| S0-03 | Skeleton: empty route segments from the proposed structure                            | `src/app/`           | planned |       |
| S0-04 | Root layout, topic navigation, and topic index page                                   | `src/app/layout.tsx`, `src/app/page.tsx` | planned |       |
| S0-05 | Shared topic page template (Basics / Edge cases / Interview questions)                | TBD                  | planned |       |
| S0-06 | Test tooling for Server/Client Components and Server Actions                          | repo root            | planned |       |
| S0-07 | First Vercel deployment                                                               | Vercel               | planned |       |
| S0-08 | Wire `claude-config/` templates: dependency-cruiser (`architecture:check`), ESLint rules | repo root         | planned |       |
| S0-09 | Wire Sentry: `claude-config/sentry.*.config.ts`, `instrumentation.ts`, `withSentryConfig` | repo root         | planned | Adopted 2026-09-28; wire after the skeleton exists |

## Stage 1: App Router fundamentals

| ID    | Item                                                                                          | Route / location                     | Status  | Notes |
| ----- | --------------------------------------------------------------------------------------------- | ------------------------------------ | ------- | ----- |
| S1-01 | File conventions: page, layout, template, loading, error, not-found, route groups, private folders | `/fundamentals/file-conventions`     | planned |       |
| S1-02 | Dynamic segments: `[slug]`, `[...slug]`, `[[...slug]]`                                        | `/fundamentals/dynamic-segments`     | planned |       |
| S1-03 | Parallel routes (`@slot`)                                                                     | `/fundamentals/parallel-routes`      | planned |       |
| S1-04 | Intercepting routes (`(.)folder`)                                                             | `/fundamentals/intercepting-routes`  | planned |       |
| S1-05 | Navigation: `<Link>`, `useRouter`, `usePathname`, `useSearchParams`, prefetching              | `/fundamentals/navigation`           | planned |       |

## Stage 2: Server Components vs Client Components

| ID    | Item                                                      | Route / location                   | Status  | Notes |
| ----- | --------------------------------------------------------- | ---------------------------------- | ------- | ----- |
| S2-01 | The `"use client"` boundary and prop serialization rules | `/components/use-client-boundary`  | planned |       |
| S2-02 | Composition: Client Components as `children`             | `/components/composition`          | planned |       |
| S2-03 | Server Component defaults and common pitfalls             | `/components/pitfalls`             | planned |       |

## Stage 3: Rendering strategies

| ID    | Item                                                         | Route / location               | Status  | Notes |
| ----- | ------------------------------------------------------------ | ------------------------------ | ------- | ----- |
| S3-01 | Static vs dynamic rendering: when Next.js picks each         | `/rendering/static-vs-dynamic` | planned |       |
| S3-02 | ISR: `revalidate`, on-demand revalidation                    | `/rendering/isr`               | planned |       |
| S3-03 | Streaming: `loading.tsx`, `<Suspense>` in the server tree    | `/rendering/streaming`         | planned |       |
| S3-04 | PPR: `"use cache"`, `cacheLife`, `cacheTag`                  | `/rendering/ppr`               | planned |       |

## Stage 4: Data fetching and caching

| ID    | Item                                                               | Route / location               | Status  | Notes |
| ----- | ------------------------------------------------------------------ | ------------------------------ | ------- | ----- |
| S4-01 | `fetch()` extensions: `cache`, `next.revalidate`, `next.tags`      | `/data/fetch-extensions`       | planned |       |
| S4-02 | Cache layers: Data, Full Route, Router cache, Request Memoization  | `/data/cache-layers`           | planned |       |
| S4-03 | Parallel vs sequential fetching, the waterfall problem             | `/data/parallel-vs-sequential` | planned |       |
| S4-04 | `revalidatePath` / `revalidateTag`                                 | `/data/revalidation`           | planned |       |
| S4-05 | Migrating `unstable_cache` to `"use cache"`                        | `/data/use-cache-migration`    | planned |       |

## Stage 5: Server Actions and forms

| ID    | Item                                                         | Route / location                          | Status  | Notes |
| ----- | ------------------------------------------------------------ | ----------------------------------------- | ------- | ----- |
| S5-01 | `"use server"`, calls from Client and Server Components      | `/server-actions/basics`                  | planned |       |
| S5-02 | `<form action>` and progressive enhancement                  | `/server-actions/forms`                   | planned |       |
| S5-03 | `useActionState`, `useFormStatus`, `useOptimistic`           | `/server-actions/form-hooks`              | planned |       |
| S5-04 | Validation, error handling, redirect after an action         | `/server-actions/validation-and-redirect` | planned |       |

## Stage 6: Advanced routing

| ID    | Item                                                            | Route / location                   | Status  | Notes |
| ----- | --------------------------------------------------------------- | ---------------------------------- | ------- | ----- |
| S6-01 | Route Handlers: HTTP methods, `NextRequest`/`NextResponse`      | `/advanced-routing/route-handlers` | planned |       |
| S6-02 | `proxy.ts`: rewrites, redirects, personalization                | `/advanced-routing/proxy`          | planned |       |
| S6-03 | Edge vs Node.js runtime                                         | `/advanced-routing/runtimes`       | planned |       |

## Stage 7: Error handling

| ID    | Item                                               | Route / location                 | Status  | Notes |
| ----- | -------------------------------------------------- | -------------------------------- | ------- | ----- |
| S7-01 | `error.tsx` vs `global-error.tsx`                  | `/errors/error-boundaries`       | planned |       |
| S7-02 | `not-found.tsx` and `notFound()`                   | `/errors/not-found`              | planned |       |
| S7-03 | Errors in Server Actions and Route Handlers        | `/errors/actions-and-handlers`   | planned |       |

## Stage 8: Metadata and SEO

| ID    | Item                                                   | Route / location               | Status  | Notes |
| ----- | ------------------------------------------------------ | ------------------------------ | ------- | ----- |
| S8-01 | `generateMetadata` (static and dynamic), `metadataBase` | `/metadata/generate-metadata`  | planned |       |
| S8-02 | `sitemap.ts`, `robots.ts`                              | `/metadata/sitemap-robots`     | planned |       |
| S8-03 | Generated Open Graph images                            | `/metadata/og-images`          | planned |       |

## Stage 9: Optimization and performance

| ID    | Item                                                 | Route / location               | Status  | Notes |
| ----- | ---------------------------------------------------- | ------------------------------ | ------- | ----- |
| S9-01 | `next/image`: lazy loading, `srcset`, `priority`, LCP | `/optimization/image`          | planned |       |
| S9-02 | `next/font`: self-hosting, avoiding layout shift     | `/optimization/font`           | planned |       |
| S9-03 | `next/dynamic`: code splitting, `ssr: false`         | `/optimization/dynamic-import` | planned |       |
| S9-04 | Turbopack vs Webpack                                 | `/optimization/bundlers`       | planned |       |
| S9-05 | Bundle analysis and Core Web Vitals                  | `/optimization/web-vitals`     | planned |       |

## Stage 10: Testing in a Next.js context

| ID     | Item                                                  | Route / location                | Status  | Notes |
| ------ | ----------------------------------------------------- | ------------------------------- | ------- | ----- |
| S10-01 | Testing Server Components vs Client Components        | `/testing/server-vs-client`     | planned |       |
| S10-02 | Mocking `fetch`/cache, testing Server Actions         | `/testing/mocking-and-actions`  | planned |       |

## Backlog / ideas

Unscheduled candidates. Promote an item to a stage when it is planned.

- _(empty)_

## Change log

Newest first. One line per change: date, IDs, what changed.

- 2026-09-28: S0-02 done — Next.js 16.3.6 initialized with pnpm;
  `cacheComponents` enabled from the start; CSS Modules + tokens chosen.
- 2026-09-28: S0-01 done; S0-08, S0-09 added (Sentry adopted, pnpm chosen);
  routes moved under `src/` to match `.claude/rules/architecture.md`.
- 2026-09-28: Initial roadmap created from the scope in `CLAUDE.md`.
