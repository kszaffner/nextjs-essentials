import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

export type NotFoundVariant = "root" | "item" | "streamedItem";

type NotFoundText = {
  navigation: {
    label: string;
    hintBefore: string;
    hintLink: string;
    hintAfter: string;
    alpha: string;
    missing: string;
    streamedAlpha: string;
    streamedMissing: string;
    noRoute: string;
  };
  slug: { title: string; hint: string };
  lookingUp: string;
  // No title means the localized "Page not found" from the shared messages.
  variants: Record<NotFoundVariant, { title?: string; source: string }>;
  internals: {
    responsesTitle: string;
    responsesHint: string;
    files: { page: string; streamed: string; notFound: string };
  };
};

const text: Record<Locale, NotFoundText> = {
  en: {
    navigation: {
      label: "Not found demo",
      hintBefore: "Prefer",
      hintLink: "this page",
      hintAfter: "for the reasoning, and curl -i to see the status codes.",
      alpha: "alpha: exists",
      missing: "nothing-here: notFound() before streaming",
      streamedAlpha: "streamed/alpha: exists",
      streamedMissing: "streamed/nothing-here: notFound() while streaming",
      noRoute: "no/such/route: matches no route at all",
    },
    slug: { title: "Item:", hint: "This slug exists, so the page rendered normally." },
    lookingUp: "Looking the item up…",
    variants: {
      root: { source: "src/app/[lang]/not-found.tsx (the root)" },
      item: { title: "No such item", source: "demo/[slug]/not-found.tsx (the segment's own)" },
      streamedItem: { title: "No such item (streamed)", source: "demo/streamed/[slug]/not-found.tsx" },
    },
    internals: {
      responsesTitle: "HTTP status of each scenario (live)",
      responsesHint:
        "Each path is fetched from the browser. Read the status column: an unknown slug is a real 404 only when notFound() runs before anything streams; inside Suspense the status was already 200.",
      files: {
        page: "notFound() runs before anything streams, so the response is a real 404.",
        streamed: "The check sits inside Suspense, after the shell was sent: the status is already 200 when notFound() runs.",
        notFound: "The segment's own not-found.tsx: it answers notFound() calls below it with its own message.",
      },
    },
  },
  pl: {
    navigation: {
      label: "Demo not found",
      hintBefore: "Zobacz",
      hintLink: "tę stronę",
      hintAfter: "po uzasadnienie, a curl -i, by zobaczyć kody statusu.",
      alpha: "alpha: istnieje",
      missing: "nothing-here: notFound() przed streamingiem",
      streamedAlpha: "streamed/alpha: istnieje",
      streamedMissing: "streamed/nothing-here: notFound() w trakcie streamingu",
      noRoute: "no/such/route: nie pasuje do żadnej trasy",
    },
    slug: { title: "Element:", hint: "Ten slug istnieje, więc strona wyrenderowała się normalnie." },
    lookingUp: "Wyszukiwanie elementu…",
    variants: {
      root: { source: "src/app/[lang]/not-found.tsx (główny)" },
      item: { title: "Nie ma takiego elementu", source: "demo/[slug]/not-found.tsx (własny segmentu)" },
      streamedItem: { title: "Nie ma takiego elementu (streaming)", source: "demo/streamed/[slug]/not-found.tsx" },
    },
    internals: {
      responsesTitle: "Status HTTP każdego scenariusza (na żywo)",
      responsesHint:
        "Każda ścieżka jest pobierana z przeglądarki. Przeczytaj kolumnę statusu: nieznany slug to prawdziwe 404 tylko wtedy, gdy notFound() wykona się przed jakimkolwiek streamingiem; wewnątrz Suspense status był już 200.",
      files: {
        page: "notFound() wykonuje się, zanim cokolwiek się zastrumieniuje, więc odpowiedź to prawdziwe 404.",
        streamed: "Sprawdzenie leży wewnątrz Suspense, po wysłaniu powłoki: status to już 200, gdy notFound() się wykonuje.",
        notFound: "Własny not-found.tsx segmentu: odpowiada na wywołania notFound() pod nim własnym komunikatem.",
      },
    },
  },
};

export function getNotFoundText(locale: Locale): NotFoundText {
  return text[locale];
}

// For the Client Components that have no params (not-found.tsx files).
export function useNotFoundText(): NotFoundText {
  return text[useLocale()];
}

export function getNotFoundInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];
  const base = "/errors/not-found/demo";

  return {
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: [
        `${base}/alpha`,
        `${base}/nothing-here`,
        `${base}/streamed/alpha`,
        `${base}/streamed/nothing-here`,
        `${base}/no/such/route`,
      ],
      headerNames: ["content-type"],
    },
    files: [
      { path: "src/app/[lang]/errors/not-found/demo/[slug]/page.tsx", note: internals.files.page },
      { path: "src/modules/not-found/components/StreamedLookup.tsx", note: internals.files.streamed },
      { path: "src/app/[lang]/errors/not-found/demo/[slug]/not-found.tsx", note: internals.files.notFound },
    ],
  };
}

export function getStreamedLookupText(locale: Locale): string {
  return text[locale].lookingUp;
}
