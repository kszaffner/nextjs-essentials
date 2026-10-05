import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type StaticVsDynamicText = {
  navigationLabel: string;
  links: { static: string; mixed: string };
  staticExample: { title: string; computation: (value: number) => string; independent: string; hint: string };
  mixedExample: { title: string; shell: string; loading: string; hint: string };
  dynamicPart: { renderedAt: string; userAgent: string; unknown: string };
  internals: {
    treeNotes: Record<string, string>;
    responsesTitle: string;
    responsesHint: string;
    files: { staticPage: string; mixedPage: string; part: string };
  };
};

const text: Record<Locale, StaticVsDynamicText> = {
  en: {
    navigationLabel: "Static vs dynamic demo",
    links: { static: "A fully static route", mixed: "A static shell with a dynamic part" },
    staticExample: {
      title: "Static route",
      computation: (value) => `A literal and a pure computation: 2 ** 10 = ${value}`,
      independent: "Nothing here depends on the request.",
      hint: "Prerendered at build time and served as HTML from the CDN. The build output marks this route with ○ (Static).",
    },
    mixedExample: {
      title: "Static shell with a dynamic part",
      shell: "This heading and paragraph are in the static shell.",
      loading: "Loading the dynamic part…",
      hint: "The shell is prerendered; the part behind Suspense streams in per request. The build output marks this route with ◐ (Partial Prerender).",
    },
    dynamicPart: { renderedAt: "rendered at", userAgent: "your user-agent", unknown: "unknown" },
    internals: {
      treeNotes: {
        "static/page.tsx": "only predictable values: part of the static shell",
        "mixed/page.tsx": "a dynamic part behind Suspense",
      },
      responsesTitle: "Response headers (live)",
      responsesHint:
        "Fetches both demo routes from your browser. On a production build the static route is a cache hit with a long s-maxage; the mixed one carries x-nextjs-postponed because part of it is streamed per request.",
      files: {
        staticPage: "The static example: a literal and a pure computation, so the whole route is in the shell.",
        mixedPage: "Puts the dynamic part behind Suspense; the fallback goes into the shell.",
        part: "Reads headers() and connection(): runtime data, so it renders on every request.",
      },
    },
  },
  pl: {
    navigationLabel: "Demo: statyczne a dynamiczne",
    links: { static: "W pełni statyczna trasa", mixed: "Statyczna powłoka z częścią dynamiczną" },
    staticExample: {
      title: "Trasa statyczna",
      computation: (value) => `Literał i czyste obliczenie: 2 ** 10 = ${value}`,
      independent: "Nic tutaj nie zależy od żądania.",
      hint: "Prerenderowana w czasie builda i serwowana jako HTML z CDN. Wyjście builda oznacza tę trasę symbolem ○ (Static).",
    },
    mixedExample: {
      title: "Statyczna powłoka z częścią dynamiczną",
      shell: "Ten nagłówek i akapit są w statycznej powłoce.",
      loading: "Ładowanie części dynamicznej…",
      hint: "Powłoka jest prerenderowana; część za Suspense streamuje się przy każdym żądaniu. Wyjście builda oznacza tę trasę symbolem ◐ (Partial Prerender).",
    },
    dynamicPart: { renderedAt: "wyrenderowano o", userAgent: "twój user-agent", unknown: "nieznany" },
    internals: {
      treeNotes: {
        "static/page.tsx": "tylko wartości przewidywalne: część statycznej powłoki",
        "mixed/page.tsx": "część dynamiczna za Suspense",
      },
      responsesTitle: "Nagłówki odpowiedzi (na żywo)",
      responsesHint:
        "Pobiera obie trasy dema z Twojej przeglądarki. Na buildzie produkcyjnym trasa statyczna to trafienie w cache z długim s-maxage; mieszana niesie x-nextjs-postponed, bo część jest streamowana przy każdym żądaniu.",
      files: {
        staticPage: "Przykład statyczny: literał i czyste obliczenie, więc cała trasa jest w powłoce.",
        mixedPage: "Umieszcza część dynamiczną za Suspense; fallback trafia do powłoki.",
        part: "Czyta headers() i connection(): dane runtime, więc renderuje się przy każdym żądaniu.",
      },
    },
  },
};

export function getStaticVsDynamicText(locale: Locale): StaticVsDynamicText {
  return text[locale];
}

export function useStaticVsDynamicText(): StaticVsDynamicText {
  return text[useLocale()];
}

const demoBase = "/rendering/static-vs-dynamic/demo";
const demoFolder = "src/app/[lang]/rendering/static-vs-dynamic/demo";

export function getStaticVsDynamicInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: demoFolder, notes: internals.treeNotes },
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: [`${demoBase}/static`, `${demoBase}/mixed`],
      headerNames: ["cache-control", "x-nextjs-cache", "x-nextjs-postponed"],
    },
    files: [
      { path: `${demoFolder}/static/page.tsx`, note: internals.files.staticPage },
      { path: `${demoFolder}/mixed/page.tsx`, note: internals.files.mixedPage },
      { path: "src/modules/static-vs-dynamic/components/DynamicPart.tsx", note: internals.files.part },
    ],
  };
}
