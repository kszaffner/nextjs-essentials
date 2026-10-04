// Single source of truth for every topic route: the navigation, the index
// page, the sitemap, and the page metadata all derive from this list. The
// words live in topicTexts.<locale>.ts.
export const topicGroups = [
  {
    id: "fundamentals",
    topics: [
      { href: "/fundamentals/file-conventions" },
      { href: "/fundamentals/dynamic-segments" },
      { href: "/fundamentals/parallel-routes" },
      { href: "/fundamentals/intercepting-routes" },
      { href: "/fundamentals/navigation" },
    ],
  },
  {
    id: "rendering",
    topics: [
      { href: "/rendering/static-vs-dynamic" },
      { href: "/rendering/isr" },
      { href: "/rendering/streaming" },
      { href: "/rendering/ppr" },
    ],
  },
  {
    id: "components",
    topics: [
      { href: "/components/use-client-boundary" },
      { href: "/components/composition" },
      { href: "/components/pitfalls" },
    ],
  },
  {
    id: "data",
    topics: [
      { href: "/data/fetch-extensions" },
      { href: "/data/cache-layers" },
      { href: "/data/parallel-vs-sequential" },
      { href: "/data/revalidation" },
      { href: "/data/use-cache-migration" },
    ],
  },
  {
    id: "server-actions",
    topics: [
      { href: "/server-actions/basics" },
      { href: "/server-actions/forms" },
      { href: "/server-actions/form-hooks" },
      { href: "/server-actions/validation-and-redirect" },
    ],
  },
  {
    id: "advanced-routing",
    topics: [
      { href: "/advanced-routing/route-handlers" },
      { href: "/advanced-routing/proxy" },
      { href: "/advanced-routing/runtimes" },
    ],
  },
  {
    id: "errors",
    topics: [
      { href: "/errors/error-boundaries" },
      { href: "/errors/not-found" },
      { href: "/errors/actions-and-handlers" },
    ],
  },
  {
    id: "metadata",
    topics: [
      { href: "/metadata/generate-metadata" },
      { href: "/metadata/sitemap-robots" },
      { href: "/metadata/og-images" },
    ],
  },
  {
    id: "optimization",
    topics: [
      { href: "/optimization/image" },
      { href: "/optimization/font" },
      { href: "/optimization/dynamic-import" },
      { href: "/optimization/bundlers" },
      { href: "/optimization/web-vitals" },
    ],
  },
  {
    id: "testing",
    topics: [
      { href: "/testing/server-vs-client" },
      { href: "/testing/mocking-and-actions" },
    ],
  },
] as const;

export type TopicGroupId = (typeof topicGroups)[number]["id"];
export type TopicHref = (typeof topicGroups)[number]["topics"][number]["href"];

export type TopicText = {
  title: string;
  summary: string;
};

export type TopicTexts = {
  groups: Record<TopicGroupId, string>;
  topics: Record<TopicHref, TopicText>;
};
