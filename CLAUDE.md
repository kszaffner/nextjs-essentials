# CLAUDE.md

## Goal

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
with that version over general knowledge.

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

### React APIs allowed in this project

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

### Proposed `app/` structure

One routing segment per topic. Each `page.tsx` holds the Basics / Edge
cases / Interview questions sections for that topic.

```text
app/
├── layout.tsx                      # root layout + topic navigation
├── page.tsx                        # index of all topics
├── global-error.tsx
├── not-found.tsx
├── sitemap.ts
├── robots.ts
├── fundamentals/
│   ├── file-conventions/           # page/layout/template/loading/error/not-found, (groups), _private
│   ├── dynamic-segments/           # [slug], [...slug], [[...slug]]
│   ├── parallel-routes/            # @slot
│   ├── intercepting-routes/        # (.)folder
│   └── navigation/                 # Link, useRouter, usePathname, useSearchParams, prefetching
├── rendering/
│   ├── static-vs-dynamic/
│   ├── isr/
│   ├── ppr/
│   └── streaming/
├── components/
│   ├── use-client-boundary/        # serialization rules
│   ├── composition/                # Client Components as children
│   └── pitfalls/
├── data/
│   ├── fetch-extensions/
│   ├── cache-layers/               # Data / Full Route / Router cache, memoization
│   ├── parallel-vs-sequential/
│   ├── revalidation/               # revalidatePath / revalidateTag
│   └── use-cache-migration/        # unstable_cache -> "use cache"
├── server-actions/
│   ├── basics/
│   ├── forms/                      # progressive enhancement
│   ├── form-hooks/                 # useActionState, useFormStatus, useOptimistic
│   └── validation-and-redirect/
├── advanced-routing/
│   ├── route-handlers/
│   ├── proxy/                      # proxy.ts lives at the project root
│   └── runtimes/                   # Edge vs Node.js
├── api/                            # Route Handlers used by the demos
├── metadata/
│   ├── generate-metadata/
│   ├── sitemap-robots/
│   └── og-images/                  # opengraph-image.tsx
├── optimization/
│   ├── image/
│   ├── font/
│   ├── dynamic-import/
│   ├── bundlers/                   # Turbopack vs Webpack
│   └── web-vitals/                 # bundle analysis, Core Web Vitals
├── errors/
│   ├── error-boundaries/           # error.tsx vs global-error.tsx
│   ├── not-found/                  # not-found.tsx, notFound()
│   └── actions-and-handlers/
└── testing/
    ├── server-vs-client/
    └── mocking-and-actions/
```

## Stack

- **Next.js**: latest stable version, App Router only (no `pages/`)
- **TypeScript**: strict mode
- **ESLint**
- **Structure**: one route/segment in `app/` per topic from the scope above
- **Deployment target**: Vercel

## Project status

- Features are implemented separately and iteratively. `ROADMAP.md` is
  the living plan and progress log: check it before starting work, and
  update it (status + change log) in the same change that adds, finishes,
  reorders, or drops an item.
- The repository currently contains only this `CLAUDE.md`. Previous
  scaffolding and workflow files were deliberately removed.
- Next step: initialize the Next.js project (App Router, TypeScript,
  ESLint, no Pages Router) and create the skeleton from the proposed
  `app/` structure above: structure and configuration only.
- After the skeleton is in place, stop and wait for further instructions
  before implementing individual topic modules.
