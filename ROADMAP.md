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

- **Done:** every topic of stages 1 to 10 is implemented (PRs 1 to 13).
- **Open:** S0-07, the first Vercel deployment. It needs the Vercel project
  connected to the GitHub repo; set `SITE_ORIGIN` (or rely on Vercel's
  production domain) in the **build** environment, plus the `SENTRY_*`
  variables from `.env.example`.
- **Next:** pick from the Backlog below, or deepen an existing topic.

## Delivery plan (13 PRs)

Roadmap items are delivered in 13 PRs, grouped by theme (regrouped on
2026-10-03 from the original 20 to reduce review overhead). Status of each
item is tracked in the stage tables below.

| PR | Items                                  | Scope | Status |
| -- | -------------------------------------- | ----- | ------ |
| 1  | S0-03 + S0-04                          | Route skeleton, root layout, topic navigation, index page | merged |
| 2  | S0-05                                  | Shared topic page template | merged |
| 3  | S0-06 + S0-08                          | Test tooling, dependency-cruiser, ESLint rules | merged |
| 4  | S0-07 + S0-09                          | First Vercel deployment, Sentry | merged (S0-07 open) |
| 5  | S1-01 + S1-02                          | File conventions, dynamic segments | merged |
| 6  | S1-03 + S1-04 + S1-05                  | Parallel routes, intercepting routes, navigation | merged |
| 7  | S2-01 + S2-02 + S2-03 + S3-01          | Server vs Client Components, static vs dynamic rendering | merged |
| 8  | S3-02 + S3-03 + S3-04 + S4-01          | ISR, streaming, PPR, `fetch()` extensions | merged |
| 9  | S4-02 + S4-03 + S4-04 + S4-05          | Cache layers, parallel fetching, revalidation, `"use cache"` migration | merged |
| 10 | S5-01 + S5-02 + S5-03 + S5-04          | Server Actions and forms | merged |
| 11 | S6-01 + S6-02 + S6-03 + S7-01 + S7-02 + S7-03 | Route Handlers, proxy, runtimes, error handling | merged |
| 12 | S8-01 + S8-02 + S8-03 + S9-01 + S9-02 + S9-03 | Metadata and SEO, image, font, dynamic import | merged |
| 13 | S9-04 + S9-05 + S10-01 + S10-02        | Bundlers, Web Vitals, testing | in review |

## Stage 0: Foundation

| ID    | Item                                                                                  | Route / location     | Status  | Notes |
| ----- | ------------------------------------------------------------------------------------- | -------------------- | ------- | ----- |
| S0-01 | Add and review the `.claude/` workflow                                                | `.claude/`, `CLAUDE.md`, `AGENTS.md` | done    | Merged into `CLAUDE.md`, cross-references fixed |
| S0-02 | Initialize Next.js (latest stable, App Router, TypeScript strict, ESLint, `src/`, no `pages/`) | repo root  | done    | Next.js 16.3.6, `cacheComponents` + React Compiler on, CSS Modules + tokens |
| S0-03 | Skeleton: empty route segments from the proposed structure                            | `src/app/`           | done    | 37 placeholder topic pages; `sitemap`, `robots`, `proxy`, `global-error`, `not-found`, `api/` land with their own topics |
| S0-04 | Root layout, topic navigation, and topic index page                                   | `src/app/layout.tsx`, `src/app/page.tsx` | done    | Topic list lives in `src/modules/topic-catalog`; layout shell in `src/shared/layout` |
| S0-05 | Shared topic page template (Basics / Edge cases / Interview questions)                | `src/shared/topic-page/` | done    | `TopicPage`; topic placeholders now render through it |
| S0-06 | Test tooling for Server/Client Components and Server Actions                          | repo root            | done    | Vitest + Testing Library (jsdom); `async` Server Components go to E2E |
| S0-07 | First Vercel deployment                                                               | Vercel               | in progress | Needs the Vercel project connected to the GitHub repo |
| S0-08 | Wire `claude-config/` templates: dependency-cruiser (`architecture:check`), ESLint rules | repo root         | done    | `architecture:check` verified against throwaway violations; ESLint rules merged |
| S0-09 | Wire Sentry: `claude-config/sentry.*.config.ts`, `instrumentation.ts`, `withSentryConfig` | repo root         | done    | `@sentry/nextjs` 11: `withSentryConfig` is imported from `@sentry/nextjs/config`; no DSN = SDK no-op |

## Stage 1: App Router fundamentals

| ID    | Item                                                                                          | Route / location                     | Status  | Notes |
| ----- | --------------------------------------------------------------------------------------------- | ------------------------------------ | ------- | ----- |
| S1-01 | File conventions: page, layout, template, loading, error, not-found, route groups, private folders | `/fundamentals/file-conventions`     | done    | `src/modules/file-conventions`; demo checked in a browser (layout vs template, loading, error, not-found, group, private) |
| S1-02 | Dynamic segments: `[slug]`, `[...slug]`, `[[...slug]]`                                        | `/fundamentals/dynamic-segments`     | done    | `src/modules/dynamic-segments`; found: `dynamicParams` is rejected with `cacheComponents`, params arrive percent-encoded |
| S1-03 | Parallel routes (`@slot`)                                                                     | `/fundamentals/parallel-routes`      | done    | `src/modules/parallel-routes`; soft vs hard navigation and `default.tsx` verified in a browser |
| S1-04 | Intercepting routes (`(.)folder`)                                                             | `/fundamentals/intercepting-routes`  | done    | `src/modules/intercepting-routes`; gallery modal with `@modal/(.)photo/[id]`, verified: soft click, hard load, Escape, back/forward |
| S1-05 | Navigation: `<Link>`, `useRouter`, `usePathname`, `useSearchParams`, prefetching              | `/fundamentals/navigation`           | done    | `src/modules/navigation`; verified: push/replace/refresh, production prefetch; `useSearchParams` needs Suspense under `cacheComponents` |

## Stage 2: Server Components vs Client Components

| ID    | Item                                                      | Route / location                   | Status  | Notes |
| ----- | --------------------------------------------------------- | ---------------------------------- | ------- | ----- |
| S2-01 | The `"use client"` boundary and prop serialization rules | `/components/use-client-boundary`  | done    | `src/modules/use-client-boundary`; arrival of each prop type checked in a browser; found: an `undefined` object property loses its key |
| S2-02 | Composition: Client Components as `children`             | `/components/composition`          | done    | `src/modules/composition`; `server-only` marker present in HTML, absent from every client chunk |
| S2-03 | Server Component defaults and common pitfalls             | `/components/pitfalls`             | done    | `src/modules/component-pitfalls`; error messages captured from real builds; client-leaf text absent from client chunks, all-client text present |

## Stage 3: Rendering strategies

| ID    | Item                                                         | Route / location               | Status  | Notes |
| ----- | ------------------------------------------------------------ | ------------------------------ | ------- | ----- |
| S3-01 | Static vs dynamic rendering: when Next.js picks each         | `/rendering/static-vs-dynamic` | done    | `src/modules/static-vs-dynamic`; ○/◐ build output and response headers (`x-nextjs-postponed`, `s-maxage`) verified |
| S3-02 | ISR: `revalidate`, on-demand revalidation                    | `/rendering/isr`               | done    | `src/modules/isr`; `use cache` + `cacheLife` + `revalidateTag`; found: `export const revalidate` is rejected with `cacheComponents`; stale-then-fresh verified |
| S3-03 | Streaming: `loading.tsx`, `<Suspense>` in the server tree    | `/rendering/streaming`         | done    | `src/modules/streaming`; measured chunk arrival (shell ~26 ms, blocks ~0.34/1.24/2.44 s); shared boundary renders children in parallel |
| S3-04 | PPR: `"use cache"`, `cacheLife`, `cacheTag`                  | `/rendering/ppr`               | done    | `src/modules/ppr`; shell vs hole verified on a production build; `cacheLife` thresholds from the shipped docs |

## Stage 4: Data fetching and caching

| ID    | Item                                                               | Route / location               | Status  | Notes |
| ----- | ------------------------------------------------------------------ | ------------------------------ | ------- | ----- |
| S4-01 | `fetch()` extensions: `cache`, `next.revalidate`, `next.tags`      | `/data/fetch-extensions`       | done    | `src/modules/fetch-extensions`; every option verified against a counting API; tags alone do not cache; needs `SITE_ORIGIN` in production |
| S4-02 | Cache layers: Data, Full Route, Router cache, Request Memoization  | `/data/cache-layers`           | done    | `src/modules/cache-layers`; found: a Link re-renders dynamic content while back/forward restores the kept page; `router.refresh()` leaves server caches alone |
| S4-03 | Parallel vs sequential fetching, the waterfall problem             | `/data/parallel-vs-sequential` | done    | `src/modules/parallel-vs-sequential`; measured 1800 ms sequential/waterfall vs 600 ms parallel/siblings; `use()` with a server-started promise |
| S4-04 | `revalidatePath` / `revalidateTag`                                 | `/data/revalidation`           | done    | `src/modules/revalidation`; `updateTag` and `revalidatePath` immediate, `revalidateTag(..., "max")` needs later visits, `refresh()` does not invalidate |
| S4-05 | Migrating `unstable_cache` to `"use cache"`                        | `/data/use-cache-migration`    | done    | `src/modules/use-cache-migration`; cache key from arguments verified; `unstable_cache` still builds, `unstable_noStore` does not make a route dynamic, six route configs rejected |

## Stage 5: Server Actions and forms

| ID    | Item                                                         | Route / location                          | Status  | Notes |
| ----- | ------------------------------------------------------------ | ----------------------------------------- | ------- | ----- |
| S5-01 | `"use server"`, calls from Client and Server Components      | `/server-actions/basics`                  | done    | `src/modules/server-actions-basics`; verified: public POST endpoint, cross-origin POST refused, calls dispatched one at a time (~629/1246/1861 ms), two build errors captured |
| S5-02 | `<form action>` and progressive enhancement                  | `/server-actions/forms`                   | done    | `src/modules/forms`; no-JS POST replayed with curl returns the updated page; bound arguments sit in the HTML and can be tampered with |
| S5-03 | `useActionState`, `useFormStatus`, `useOptimistic`           | `/server-actions/form-hooks`              | done    | `src/modules/form-hooks`; pending, optimistic entry and rollback measured in a browser; the form resets even after a rejection |
| S5-04 | Validation, error handling, redirect after an action         | `/server-actions/validation-and-redirect` | done    | `src/modules/validation-and-redirect`; no-JS valid POST gives 303 + Location, invalid gives 200 with errors; Zod schema unit-tested |

## Stage 6: Advanced routing

| ID    | Item                                                            | Route / location                   | Status  | Notes |
| ----- | --------------------------------------------------------------- | ---------------------------------- | ------- | ----- |
| S6-01 | Route Handlers: HTTP methods, `NextRequest`/`NextResponse`      | `/advanced-routing/route-handlers` | done    | `src/modules/route-handlers`; verified: 405/HEAD/OPTIONS handled for you, no built-in CSRF check (foreign Origin accepted), 415 guard, 400 vs 422 |
| S6-02 | `proxy.ts`: rewrites, redirects, personalization                | `/advanced-routing/proxy`          | done    | `src/proxy.ts` + `src/modules/proxy`; redirect 307, rewrite, direct 403, cookie A/B; runs before the cache; decision function unit-tested |
| S6-03 | Edge vs Node.js runtime                                         | `/advanced-routing/runtimes`       | done    | `src/modules/runtimes`; `proxy.ts` = nodejs, legacy `middleware.ts` = edge (deprecated), `runtime = "edge"` is a build error |

## Stage 7: Error handling

| ID    | Item                                               | Route / location                 | Status  | Notes |
| ----- | -------------------------------------------------- | -------------------------------- | ------- | ----- |
| S7-01 | `error.tsx` vs `global-error.tsx`                  | `/errors/error-boundaries`       | done    | `src/app/global-error.tsx` + `src/modules/error-boundaries`; layout error caught by the parent boundary; message masked with a digest matching the server log |
| S7-02 | `not-found.tsx` and `notFound()`                   | `/errors/not-found`              | done    | `src/app/not-found.tsx` + `src/modules/not-found`; 404 before streaming, 200 + noindex inside Suspense |
| S7-03 | Errors in Server Actions and Route Handlers        | `/errors/actions-and-handlers`   | done    | `src/modules/actions-and-handlers`; expected 409/state, unexpected 500 with a reference id and no leak; `src/shared/monitoring` reporter that never throws |

## Stage 8: Metadata and SEO

| ID    | Item                                                   | Route / location               | Status  | Notes |
| ----- | ------------------------------------------------------ | ------------------------------ | ------- | ----- |
| S8-01 | `generateMetadata` (static and dynamic), `metadataBase` | `/metadata/generate-metadata`  | done    | `src/modules/generate-metadata`; verified: `openGraph` is replaced, not merged (fixed via `parent`); `metadataBase` is baked in at build time |
| S8-02 | `sitemap.ts`, `robots.ts`                              | `/metadata/sitemap-robots`     | done    | `src/app/sitemap.ts`, `src/app/robots.ts` + `src/modules/sitemap-robots`; verified: 38 URLs, prerendered; `lastModified: new Date()` makes the file dynamic and lies |
| S8-03 | Generated Open Graph images                            | `/metadata/og-images`          | done    | `src/app/opengraph-image.tsx` + `src/modules/og-images`; verified: real 1200x630 PNG, nested file replaces the site-wide one |

## Stage 9: Optimization and performance

| ID    | Item                                                 | Route / location               | Status  | Notes |
| ----- | ---------------------------------------------------- | ------------------------------ | ------- | ----- |
| S9-01 | `next/image`: lazy loading, `srcset`, `priority`, LCP | `/optimization/image`          | done    | `src/modules/image`; verified: `preload` link, lazy attributes, 121 KB JPEG -> 6 KB WebP, `/_next/image` refuses unlisted sizes and qualities |
| S9-02 | `next/font`: self-hosting, avoiding layout shift     | `/optimization/font`           | done    | `src/modules/font`; verified: self-hosted WOFF2 (immutable), size-adjusted fallback, preload via a `Link` header, loader literal/module-scope build errors |
| S9-03 | `next/dynamic`: code splitting, `ssr: false`         | `/optimization/dynamic-import` | done    | `src/modules/dynamic-import`; verified: `ssr: false` panel absent from the HTML and loaded as one extra chunk; `ssr: false` in a Server Component is a build error |
| S9-04 | Turbopack vs Webpack                                 | `/optimization/bundlers`       | done    | `src/modules/bundlers`; measured on one project: Turbopack build 16-17 s / 44 client files / 382 KB gzip vs Webpack 94 s / 155 files / 509 KB gzip; both build with Sentry and the React Compiler |
| S9-05 | Bundle analysis and Core Web Vitals                  | `/optimization/web-vitals`     | done    | `src/modules/web-vitals` (+ collector in the root layout) and `pnpm analyze`; TTFB verified; FCP/LCP/INP could not be observed in the automated browser |

## Stage 10: Testing in a Next.js context

| ID     | Item                                                  | Route / location                | Status  | Notes |
| ------ | ----------------------------------------------------- | ------------------------------- | ------- | ----- |
| S10-01 | Testing Server Components vs Client Components        | `/testing/server-vs-client`     | done    | `src/modules/testing-components`; verified: an async component rendered as JSX renders nothing, silently; calling it as a function works |
| S10-02 | Mocking `fetch`/cache, testing Server Actions         | `/testing/mocking-and-actions`  | done    | `src/modules/testing-actions`; ten real tests mapped by technique; behavior of `redirect`, `revalidatePath`, `cookies`, `connection`, `cacheLife` in a plain test process verified |

## Stage L: Languages and "Under the hood"

Polish (default) and English for every topic, and an "Under the hood" panel
on every demo: live evidence (network requests, headers, cache state) plus
the real project files behind the demo. Each topic is touched once, so
translation and panel ship together, one PR per group.

Per topic: `content/{en,pl}.tsx` (Basics, Edge cases, Interview questions),
`text.ts` (demo labels and the panel's data), a `get<Topic>Internals()` in the
module index, and an `<InternalsPanel>` composed in the demo route. See
"Languages and Under the hood" in `CLAUDE.md`.

| ID  | Scope                                               | Topics | Status |
| --- | --------------------------------------------------- | ------ | ------ |
| L0  | Routing foundation: `[lang]`, proxy redirect, catalog, sitemap | - | done (merged) |
| L1  | Panel foundation + App Router fundamentals + `next/dynamic` (pilot) | file-conventions, dynamic-segments, parallel-routes, intercepting-routes, navigation, dynamic-import | done (merged) |
| L2  | Rendering + Server/Client Components                | static-vs-dynamic, isr, streaming, ppr, use-client-boundary, composition, pitfalls | done (merged) |
| L3  | Data fetching and caching                           | fetch-extensions, cache-layers, parallel-vs-sequential, revalidation, use-cache-migration | done (merged) |
| L4  | Server Actions and forms                            | basics, forms, form-hooks, validation-and-redirect | done (merged) |
| L5  | Advanced routing + error handling                   | route-handlers, proxy, runtimes, error-boundaries, not-found, actions-and-handlers | done (merged) |
| L6  | Metadata and SEO + testing                          | generate-metadata, sitemap-robots, og-images, server-vs-client, mocking-and-actions | done (merged) |
| L7  | Optimization                                        | image, font, bundlers, web-vitals | in review |
| L8  | Wrap-up: test that every topic has both languages and a panel, Playwright smoke for the language switch, docs | - | planned |

## Backlog / ideas

Unscheduled candidates. Promote an item to a stage when it is planned.

- _(empty)_

## Change log

Newest first. One line per change: date, IDs, what changed.

- 2026-10-06: L7 (PR 21) — four optimization topics (image, font, bundlers,
  web-vitals) translated with panels. The bundler commands are now `CodeBlock`s
  instead of a bare `<pre>`. Measured on a production build: the font demo's
  `Link` header preloads three fonts against two on a regular page, the image
  panel lists the real `/_next/image` requests (widths 384 and 828 for the
  gallery, 1920 for the hero), and the Turbopack build loads a `turbopack-…`
  runtime chunk.

- 2026-10-05: L6 (PR 20) — five topics (generate-metadata, sitemap-robots,
  og-images, server-vs-client, mocking-and-actions) translated with panels.
  `testedUnits` now holds ids and test files only; titles and techniques are per
  language in `text.ts` (a test checks both languages cover every unit). Fixed:
  the demo's `canonical` URLs were not language-prefixed. Measured on a
  production build: sitemap has 76 URLs (the content said 38), the generated
  OG image is a 1200x630 PNG of about 37 KB, and the og:image URL carries a hash.

- 2026-10-05: L5 (PR 19) — six topics (route-handlers, proxy, runtimes,
  error-boundaries, not-found, actions-and-handlers) translated with panels.
  Server code returns codes, not sentences, where the UI shows the result:
  `RefusalCode` in actions-and-handlers, and the shared `BoundaryFallback` and
  `NotFoundPanel` now take a `boundary`/`variant` key and read the language with
  `useLocale()`. Measured on a production build: not-found is 404 before
  streaming and 200 inside Suspense, a crashing page or layout answers 200,
  proxy/runtime header is `nodejs`, and an uncaught handler throw is a bare 500.

- 2026-10-05: Code blocks (PR 18) — `src/shared/code-block` (`CodeBlock`: dark
  editor look in both color schemes, `sugar-high` highlighting, `--color-code-*`
  tokens). The 25 existing `<pre>` blocks were migrated and the 19 topics that
  had no example got one (en and pl). Topics not yet translated (L5 to L7) have
  the English example; translate its comments with the topic.

- 2026-10-05: L4 (PR 17) — four Server Actions topics translated with panels
  (live request log, source excerpts). Action results no longer carry English
  sentences: `form-hooks` returns a rejection code and `validation-and-redirect`
  returns field error codes (`signupErrorCodes`), and the UI picks the wording
  per language. Measured on a production build: three fired action calls are
  three POST fetches to the page URL, about 600 ms apart.

- 2026-10-05: L3 (PR 16) — five data topics translated with panels
  (response headers, streamed chunk timing, source excerpts). Measured on a
  production build: the demo pages answer `no-store` (dynamic holes), the
  static `cache-layers/demo/other` carries `s-maxage=31536000` and
  `x-nextjs-stale-time: 300`, `revalidation/demo` is a cache HIT with
  `s-maxage=3600, stale-while-revalidate=82800`; the parallel-vs-sequential
  page streams for about 1.8 s (sequential and nested strategies).

- 2026-10-05: L2 (PR 15) — seven topics translated with panels. New panel
  evidence in `src/shared/under-the-hood`: `ResponseHeaders`, `ResponseStream`
  (chunk timing of a streamed page), `RscPayload`, `ChunkSearch` (greps the
  loaded client chunks). Measured: streaming shell 56 ms, blocks 329/1228/2431
  ms; server-only marker found in no client chunk.

- 2026-10-04: L1 (PR 14) — `src/shared/under-the-hood` (panel, live request log,
  directory tree, source excerpts read at build time); `TopicContent` per
  language; six topics translated with panels. Added Stage L (L0 to L8).

- 2026-10-04: L0 (was I18N-01 foundation) — all routes moved under `src/app/[lang]`
  (`pl` default, `en`); unprefixed paths redirect via `proxy.ts`; topic
  catalog, navigation, topic page headings and sitemap are bilingual. Topic
  bodies are still English until translated. Added LIVE-01 to the Backlog.

- 2026-10-04: S9-04, S9-05, S10-01, S10-02 done (PR 13) — the delivery plan is
  complete. Added 7 test files for existing server code (actions, route
  handlers, `use cache`, fetch), the `analyze` script, and removed the
  now-unused `TopicPlaceholder`. Open: S0-07.
- 2026-10-04: S8-01..S8-03, S9-01..S9-03 done (PR 12) — Stage 8 complete;
  Stage 9 has S9-04 and S9-05 left. Added `sitemap.ts`, `robots.ts`, a root
  `opengraph-image.tsx`, `src/shared/site`, and generated demo images in
  `public/demo`.
- 2026-10-04: S6-01..S6-03, S7-01..S7-03 done (PR 11) — Stages 6 and 7
  complete; added `src/proxy.ts`, `global-error.tsx`, root `not-found.tsx`,
  and `src/shared/monitoring`.
- 2026-10-04: S5-01..S5-04 done (PR 10) — Stage 5 complete; added the global
  `--color-danger` token.
- 2026-10-03: S4-02, S4-03, S4-04, S4-05 done (PR 9) — Stage 4 complete.
- 2026-10-03: S3-02, S3-03, S3-04, S4-01 done (PR 8); added `zod` and the
  first Route Handler (`/api/fetch-extensions/clock`).
- 2026-10-03: S2-01, S2-02, S2-03, S3-01 done (PR 7); added `server-only`.
- 2026-10-03: S1-03, S1-04, S1-05 done (PR 6); delivery plan regrouped from
  20 to 13 PRs (8 remaining after PR 5).
- 2026-10-03: S1-01, S1-02 done (PR 5) — first real topics. The sidebar
  links are now wrapped in `<Suspense>` (`usePathname()` is runtime data on
  routes with dynamic params under Cache Components).
- 2026-10-03: S0-09 done, S0-07 in progress (PR 4) — Sentry wired for client,
  server, and edge; release from `VERCEL_GIT_COMMIT_SHA`; `.env.example` added.
- 2026-10-03: S0-06, S0-08 done (PR 3) — Vitest, `architecture:check`, ESLint
  naming/SOLID rules; `pnpm check` now runs all four checks. Fixed the
  public-API rule in `dependency-cruiser.cjs` so `index.ts` files are checked too.
- 2026-10-03: S0-05 done (PR 2) — shared `TopicPage` template with Basics,
  Edge cases, and Interview questions sections.
- 2026-10-03: S0-03, S0-04 done (PR 1) — route skeleton with placeholder
  pages, root layout, topic navigation, index page; added the 20-PR
  delivery plan.
- 2026-09-28: S0-02 done — Next.js 16.3.6 initialized with pnpm;
  `cacheComponents` enabled from the start; CSS Modules + tokens chosen.
- 2026-09-28: S0-01 done; S0-08, S0-09 added (Sentry adopted, pnpm chosen);
  routes moved under `src/` to match `.claude/rules/architecture.md`.
- 2026-09-28: Initial roadmap created from the scope in `CLAUDE.md`.
