import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

export type DemoLinkKey =
  | "blogPrerendered"
  | "blogRuntime"
  | "blogFeatured"
  | "validatedKnown"
  | "validatedUnknown"
  | "shopThree"
  | "shopNone"
  | "docsNone"
  | "docsTwo";

type DynamicSegmentsText = {
  navigationLabel: string;
  links: Record<DemoLinkKey, string>;
  readingParams: string;
  report: {
    route: string;
    emptyParams: string;
    languageSegment: string;
  };
  notes: { featured: string; prerendered: string; runtime: string };
  internals: {
    treeNotes: Record<string, string>;
    files: { blog: string; validated: string; shop: string; docs: string };
  };
};

const text: Record<Locale, DynamicSegmentsText> = {
  en: {
    navigationLabel: "Dynamic segments demo",
    links: {
      blogPrerendered: "[slug]: prerendered slug",
      blogRuntime: "[slug]: slug not in generateStaticParams",
      blogFeatured: "blog/featured: static segment wins over [slug]",
      validatedKnown: "validated/[id]: known id",
      validatedUnknown: "validated/[id]: unknown id (notFound())",
      shopThree: "shop/[...slug]: three segments",
      shopNone: "shop: no segments (404, catch-all is not optional)",
      docsNone: "docs/[[...slug]]: no segments (no slug in params)",
      docsTwo: "docs/[[...slug]]: two segments",
    },
    readingParams: "Reading params…",
    report: {
      route: "Route",
      emptyParams: "The demo route captured no dynamic segment: params has no slug key.",
      languageSegment: "(the site's own [lang] segment, not part of the demo route)",
    },
    notes: {
      featured:
        "A static segment beats a dynamic sibling: this file handles /blog/featured, so [slug] never sees 'featured'.",
      prerendered: "Listed in generateStaticParams: prerendered at build time.",
      runtime:
        "Not listed in generateStaticParams: rendered on the first request, then cached (dynamicParams defaults to true).",
    },
    internals: {
      treeNotes: {
        "blog/[slug]": "[slug] = one dynamic segment",
        "blog/featured": "static folder: wins over [slug]",
        "validated/[id]": "validated with notFound()",
        "shop/[...slug]": "catch-all: one or more segments",
        "docs/[[...slug]]": "optional catch-all: also matches /docs",
      },
      files: {
        blog: "generateStaticParams lists the prerendered slugs; params arrives as a Promise.",
        validated: "Validates the id and calls notFound() for unknown values.",
        shop: "Reads params in a Suspense boundary: no generateStaticParams.",
        docs: "The optional catch-all: the slug key is absent for /docs.",
      },
    },
  },
  pl: {
    navigationLabel: "Demo segmentów dynamicznych",
    links: {
      blogPrerendered: "[slug]: prerenderowany slug",
      blogRuntime: "[slug]: slug spoza generateStaticParams",
      blogFeatured: "blog/featured: segment statyczny wygrywa z [slug]",
      validatedKnown: "validated/[id]: znane id",
      validatedUnknown: "validated/[id]: nieznane id (notFound())",
      shopThree: "shop/[...slug]: trzy segmenty",
      shopNone: "shop: brak segmentów (404, catch-all nie jest opcjonalny)",
      docsNone: "docs/[[...slug]]: brak segmentów (brak slug w params)",
      docsTwo: "docs/[[...slug]]: dwa segmenty",
    },
    readingParams: "Odczyt params…",
    report: {
      route: "Trasa",
      emptyParams: "Trasa dema nie przechwyciła żadnego segmentu dynamicznego: w params nie ma klucza slug.",
      languageSegment: "(własny segment [lang] tej strony, nie część trasy dema)",
    },
    notes: {
      featured:
        "Segment statyczny wygrywa z dynamicznym rodzeństwem: ten plik obsługuje /blog/featured, więc [slug] nigdy nie widzi 'featured'.",
      prerendered: "Wymieniony w generateStaticParams: prerenderowany w czasie builda.",
      runtime:
        "Niewymieniony w generateStaticParams: renderowany przy pierwszym żądaniu, potem cache'owany (dynamicParams domyślnie true).",
    },
    internals: {
      treeNotes: {
        "blog/[slug]": "[slug] = jeden segment dynamiczny",
        "blog/featured": "folder statyczny: wygrywa z [slug]",
        "validated/[id]": "walidowane przez notFound()",
        "shop/[...slug]": "catch-all: jeden lub więcej segmentów",
        "docs/[[...slug]]": "opcjonalny catch-all: pasuje też do /docs",
      },
      files: {
        blog: "generateStaticParams wymienia prerenderowane slugi; params przychodzi jako Promise.",
        validated: "Waliduje id i wywołuje notFound() dla nieznanych wartości.",
        shop: "Czyta params w granicy Suspense: bez generateStaticParams.",
        docs: "Opcjonalny catch-all: dla /docs klucza slug nie ma.",
      },
    },
  },
};

export function getDynamicSegmentsText(locale: Locale): DynamicSegmentsText {
  return text[locale];
}

export function useDynamicSegmentsText(): DynamicSegmentsText {
  return text[useLocale()];
}

const demoFolder = "src/app/[lang]/fundamentals/dynamic-segments/demo";

export function getDynamicSegmentsInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: demoFolder, notes: internals.treeNotes },
    files: [
      { path: `${demoFolder}/blog/[slug]/page.tsx`, note: internals.files.blog },
      { path: `${demoFolder}/validated/[id]/page.tsx`, note: internals.files.validated },
      { path: `${demoFolder}/shop/[...slug]/page.tsx`, note: internals.files.shop },
      { path: `${demoFolder}/docs/[[...slug]]/page.tsx`, note: internals.files.docs },
    ],
  };
}
