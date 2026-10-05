import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type PprText = {
  static: { title: string; hint: string };
  hourly: { title: string; hint: string };
  seconds: { title: string; hint: string };
  request: { title: string; hint: string };
  generatedAt: string;
  now: string;
  loading: { three: string; four: string; hint: string };
  internals: {
    streamTitle: string;
    streamHint: string;
    responsesTitle: string;
    responsesHint: string;
    files: { demo: string; cache: string };
  };
};

const text: Record<Locale, PprText> = {
  en: {
    static: { title: "1. Static", hint: "Known at build time: part of the static shell." },
    hourly: {
      title: '2. Cached for hours ("use cache" + cacheLife("hours"))',
      hint: "Prerendered into the shell: the timestamp is from the build (or the last regeneration), not from your request.",
    },
    seconds: {
      title: '3. Cached for seconds ("use cache" + cacheLife("seconds"))',
      hint: "Too short-lived for the shell, so it is a dynamic hole, refreshed about every second.",
    },
    request: { title: "4. Request time (connection())", hint: "Never cached: rendered for every request." },
    generatedAt: "generated at",
    now: "now",
    loading: { three: "3. (loading)", four: "4. (loading)", hint: "Suspense fallback in the shell." },
    internals: {
      streamTitle: "The response as a stream (live)",
      streamHint:
        "The first chunk is the static shell: parts 1 and 2 with real values, parts 3 and 4 as Suspense fallbacks. Later chunks fill the holes.",
      responsesTitle: "Response headers (live)",
      responsesHint: "x-nextjs-postponed marks a response whose shell was prerendered and whose holes are streamed.",
      files: {
        demo: "Only the two dynamic parts sit inside Suspense boundaries; the rest is in the shell.",
        cache: "The two cache lifetimes: hours stays in the shell, seconds is too short and becomes a hole.",
      },
    },
  },
  pl: {
    static: { title: "1. Statyczne", hint: "Znane w czasie builda: część statycznej powłoki." },
    hourly: {
      title: '2. Cache na godziny ("use cache" + cacheLife("hours"))',
      hint: "Prerenderowane do powłoki: znacznik czasu pochodzi z builda (lub ostatniej regeneracji), a nie z Twojego żądania.",
    },
    seconds: {
      title: '3. Cache na sekundy ("use cache" + cacheLife("seconds"))',
      hint: "Zbyt krótko żyje na powłokę, więc to dynamiczna dziura, odświeżana mniej więcej co sekundę.",
    },
    request: { title: "4. Czas żądania (connection())", hint: "Nigdy nie w cache: renderowane przy każdym żądaniu." },
    generatedAt: "wygenerowano o",
    now: "teraz",
    loading: { three: "3. (ładowanie)", four: "4. (ładowanie)", hint: "Fallback Suspense w powłoce." },
    internals: {
      streamTitle: "Odpowiedź jako strumień (na żywo)",
      streamHint:
        "Pierwszy fragment to statyczna powłoka: części 1 i 2 z prawdziwymi wartościami, części 3 i 4 jako fallbacki Suspense. Kolejne fragmenty wypełniają dziury.",
      responsesTitle: "Nagłówki odpowiedzi (na żywo)",
      responsesHint: "x-nextjs-postponed oznacza odpowiedź, której powłoka była prerenderowana, a dziury są streamowane.",
      files: {
        demo: "Tylko dwie części dynamiczne leżą w granicach Suspense; reszta jest w powłoce.",
        cache: "Dwa czasy życia cache: hours zostaje w powłoce, seconds jest za krótki i staje się dziurą.",
      },
    },
  },
};

export function getPprText(locale: Locale): PprText {
  return text[locale];
}

export function getPprInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];
  const path = "/rendering/ppr/demo";

  return {
    stream: { title: internals.streamTitle, description: internals.streamHint, path },
    responses: {
      title: internals.responsesTitle,
      description: internals.responsesHint,
      paths: [path],
      headerNames: ["cache-control", "x-nextjs-postponed"],
    },
    files: [
      { path: "src/modules/ppr/components/PprDemo.tsx", note: internals.files.demo },
      { path: "src/modules/ppr/server/cachedFacts.ts", note: internals.files.cache },
    ],
  };
}
