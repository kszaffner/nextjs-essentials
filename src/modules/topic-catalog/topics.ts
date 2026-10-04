export type Topic = {
  href: string;
  title: string;
  summary: string;
};

export type TopicGroup = {
  title: string;
  topics: readonly Topic[];
};

// Single source of truth for every topic route: the navigation, the index
// page, and the placeholder pages all derive from this list.
export const topicGroups = [
  {
    title: "App Router fundamentals",
    topics: [
      {
        href: "/fundamentals/file-conventions",
        title: "File conventions",
        summary:
          "page, layout, template, loading, error, not-found, route groups, and private folders.",
      },
      {
        href: "/fundamentals/dynamic-segments",
        title: "Dynamic segments",
        summary: "[slug], catch-all [...slug], and optional catch-all [[...slug]].",
      },
      {
        href: "/fundamentals/parallel-routes",
        title: "Parallel routes",
        summary: "Rendering several pages in one layout with @slot folders.",
      },
      {
        href: "/fundamentals/intercepting-routes",
        title: "Intercepting routes",
        summary: "Showing another route in the current context with (.)folder.",
      },
      {
        href: "/fundamentals/navigation",
        title: "Navigation",
        summary:
          "Link, useRouter, usePathname, useSearchParams, and prefetching.",
      },
    ],
  },
  {
    title: "Rendering strategies",
    topics: [
      {
        href: "/rendering/static-vs-dynamic",
        title: "Static vs dynamic rendering",
        summary: "When Next.js prerenders a route and when it renders per request.",
      },
      {
        href: "/rendering/isr",
        title: "Incremental Static Regeneration",
        summary: "Time-based and on-demand revalidation of prerendered output.",
      },
      {
        href: "/rendering/streaming",
        title: "Streaming",
        summary: "loading.tsx and Suspense boundaries in the Server Component tree.",
      },
      {
        href: "/rendering/ppr",
        title: "Partial Prerendering",
        summary: '"use cache", cacheLife, and cacheTag with a static shell.',
      },
    ],
  },
  {
    title: "Server and Client Components",
    topics: [
      {
        href: "/components/use-client-boundary",
        title: "The use client boundary",
        summary: "What can and cannot cross the boundary as props.",
      },
      {
        href: "/components/composition",
        title: "Composition",
        summary: "Passing Client Components as children to Server Components.",
      },
      {
        href: "/components/pitfalls",
        title: "Pitfalls",
        summary: "Server Component defaults and the mistakes they invite.",
      },
    ],
  },
  {
    title: "Data fetching and caching",
    topics: [
      {
        href: "/data/fetch-extensions",
        title: "fetch() extensions",
        summary: "cache, next.revalidate, and next.tags.",
      },
      {
        href: "/data/cache-layers",
        title: "Cache layers",
        summary:
          "Data Cache, Full Route Cache, Router Cache, and Request Memoization.",
      },
      {
        href: "/data/parallel-vs-sequential",
        title: "Parallel vs sequential fetching",
        summary: "The waterfall problem and how to avoid it.",
      },
      {
        href: "/data/revalidation",
        title: "Revalidation",
        summary: "revalidatePath and revalidateTag.",
      },
      {
        href: "/data/use-cache-migration",
        title: "Migrating to use cache",
        summary: 'Moving from unstable_cache to "use cache".',
      },
    ],
  },
  {
    title: "Server Actions and forms",
    topics: [
      {
        href: "/server-actions/basics",
        title: "Server Actions basics",
        summary: '"use server" and calling actions from Client and Server Components.',
      },
      {
        href: "/server-actions/forms",
        title: "Forms",
        summary: "form action and progressive enhancement.",
      },
      {
        href: "/server-actions/form-hooks",
        title: "Form hooks",
        summary: "useActionState, useFormStatus, and useOptimistic.",
      },
      {
        href: "/server-actions/validation-and-redirect",
        title: "Validation and redirect",
        summary: "Validating input, reporting errors, and redirecting after an action.",
      },
    ],
  },
  {
    title: "Advanced routing",
    topics: [
      {
        href: "/advanced-routing/route-handlers",
        title: "Route Handlers",
        summary: "HTTP methods with NextRequest and NextResponse.",
      },
      {
        href: "/advanced-routing/proxy",
        title: "Proxy",
        summary: "Rewrites, redirects, and personalization in proxy.ts.",
      },
      {
        href: "/advanced-routing/runtimes",
        title: "Runtimes",
        summary: "Edge Runtime vs Node.js runtime.",
      },
    ],
  },
  {
    title: "Error handling",
    topics: [
      {
        href: "/errors/error-boundaries",
        title: "Error boundaries",
        summary: "error.tsx vs global-error.tsx.",
      },
      {
        href: "/errors/not-found",
        title: "Not found",
        summary: "not-found.tsx and notFound().",
      },
      {
        href: "/errors/actions-and-handlers",
        title: "Actions and handlers",
        summary: "Error handling in Server Actions and Route Handlers.",
      },
    ],
  },
  {
    title: "Metadata and SEO",
    topics: [
      {
        href: "/metadata/generate-metadata",
        title: "generateMetadata",
        summary: "Static and dynamic metadata, and metadataBase.",
      },
      {
        href: "/metadata/sitemap-robots",
        title: "Sitemap and robots",
        summary: "sitemap.ts and robots.ts.",
      },
      {
        href: "/metadata/og-images",
        title: "Open Graph images",
        summary: "Generated images with opengraph-image.tsx.",
      },
    ],
  },
  {
    title: "Optimization and performance",
    topics: [
      {
        href: "/optimization/image",
        title: "next/image",
        summary: "Lazy loading, srcset, priority, and LCP.",
      },
      {
        href: "/optimization/font",
        title: "next/font",
        summary: "Self-hosting fonts and avoiding layout shift.",
      },
      {
        href: "/optimization/dynamic-import",
        title: "next/dynamic",
        summary: "Code splitting and ssr: false.",
      },
      {
        href: "/optimization/bundlers",
        title: "Turbopack vs Webpack",
        summary: "The mental model and when to use each.",
      },
      {
        href: "/optimization/web-vitals",
        title: "Web Vitals",
        summary: "Bundle analysis and Core Web Vitals.",
      },
    ],
  },
  {
    title: "Testing",
    topics: [
      {
        href: "/testing/server-vs-client",
        title: "Server vs Client Components",
        summary: "Testing each kind of component.",
      },
      {
        href: "/testing/mocking-and-actions",
        title: "Mocking and Server Actions",
        summary: "Mocking fetch and cache, and testing Server Actions.",
      },
    ],
  },
] as const satisfies readonly TopicGroup[];

export type TopicHref =
  (typeof topicGroups)[number]["topics"][number]["href"];

const allTopics = topicGroups.flatMap<Topic>((group) => [...group.topics]);

export function getTopic(href: TopicHref): Topic {
  const topic = allTopics.find((candidate) => candidate.href === href);
  if (!topic) {
    // Unreachable while TopicHref is derived from the same list.
    throw new Error(`Unknown topic: ${href}`);
  }
  return topic;
}

export function getTopicMetadata(href: TopicHref) {
  const topic = getTopic(href);
  return { title: topic.title, description: topic.summary };
}

// Every topic page's path, in catalog order (used for the sitemap).
export function listTopicHrefs(): readonly string[] {
  return allTopics.map((topic) => topic.href);
}
