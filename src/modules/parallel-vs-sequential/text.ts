import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type StrategyText = { title: string; hint: string };

type FetchingStrategiesText = {
  running: string;
  took: string;
  sequential: StrategyText;
  parallel: StrategyText;
  waterfall: StrategyText & { resolved: string };
  siblings: StrategyText;
  promise: StrategyText & { waiting: string; clientRead: string };
  internals: {
    streamTitle: string;
    streamHint: string;
    files: { sequential: string; parallel: string; waterfall: string; siblings: string };
  };
};

const text: Record<Locale, FetchingStrategiesText> = {
  en: {
    running: "running…",
    took: "took",
    sequential: {
      title: "Sequential awaits",
      hint: "Three independent requests awaited one after another: the delays add up.",
    },
    parallel: {
      title: "Promise.all",
      hint: "The same three requests started together: the time is the slowest one, not the sum.",
    },
    waterfall: {
      title: "Nested components, each fetching",
      hint: "Three levels, each waiting for its parent before it fetches: a waterfall, even though the requests are independent.",
      resolved: "last level resolved after",
    },
    siblings: {
      title: "Sibling components, each fetching",
      hint: "Components next to each other fetch at the same time, each behind its own Suspense boundary, and appear as they resolve.",
    },
    promise: {
      title: "Start on the server, read with use()",
      hint: "The server starts the request and passes the promise to a Client Component, which reads it with use() behind Suspense.",
      waiting: "waiting for the promise…",
      clientRead: "client read",
    },
    internals: {
      streamTitle: "Streamed response, chunk by chunk (live)",
      streamHint:
        "The page is streamed, and each strategy fills in when it finishes. Press the button and read the timing of the chunks: parallel and sibling parts arrive after about 600 ms, sequential and nested ones after about 1800 ms.",
      files: {
        sequential: "Three awaits in a row: each starts after the previous one ended.",
        parallel: "Promise.all: all three start at once, the slowest sets the time.",
        waterfall: "A component that renders the next one only after its own await: a waterfall hidden in the tree.",
        siblings: "Sibling components, each behind its own Suspense boundary, fetch at the same time.",
      },
    },
  },
  pl: {
    running: "w toku…",
    took: "trwało",
    sequential: {
      title: "Sekwencyjne awaity",
      hint: "Trzy niezależne żądania czekane jedno po drugim: opóźnienia się sumują.",
    },
    parallel: {
      title: "Promise.all",
      hint: "Te same trzy żądania wystartowane razem: czas to ten najwolniejszego, nie suma.",
    },
    waterfall: {
      title: "Zagnieżdżone komponenty, każdy pobiera dane",
      hint: "Trzy poziomy, każdy czeka na rodzica, zanim pobierze dane: kaskada, mimo że żądania są niezależne.",
      resolved: "ostatni poziom rozwiązany po",
    },
    siblings: {
      title: "Komponenty rodzeństwa, każdy pobiera dane",
      hint: "Komponenty obok siebie pobierają dane w tym samym czasie, każdy za własną granicą Suspense, i pojawiają się w miarę rozwiązywania.",
    },
    promise: {
      title: "Start na serwerze, odczyt przez use()",
      hint: "Serwer startuje żądanie i przekazuje promise do Client Component, który czyta go przez use() za Suspense.",
      waiting: "czekam na promise…",
      clientRead: "odczyt po stronie klienta",
    },
    internals: {
      streamTitle: "Strumieniowana odpowiedź, kawałek po kawałku (na żywo)",
      streamHint:
        "Strona jest strumieniowana, a każda strategia uzupełnia się, gdy skończy. Naciśnij przycisk i przeczytaj czasy kawałków: części równoległe i rodzeństwa przychodzą po około 600 ms, sekwencyjne i zagnieżdżone po około 1800 ms.",
      files: {
        sequential: "Trzy awaity z rzędu: każdy startuje po zakończeniu poprzedniego.",
        parallel: "Promise.all: wszystkie trzy startują naraz, najwolniejszy wyznacza czas.",
        waterfall: "Komponent, który renderuje następny dopiero po własnym await: kaskada ukryta w drzewie.",
        siblings: "Komponenty rodzeństwa, każdy za własną granicą Suspense, pobierają dane w tym samym czasie.",
      },
    },
  },
};

export function getFetchingStrategiesText(locale: Locale): FetchingStrategiesText {
  return text[locale];
}

export function getFetchingStrategiesInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    stream: {
      title: internals.streamTitle,
      description: internals.streamHint,
      path: "/data/parallel-vs-sequential/demo",
    },
    files: [
      { path: "src/modules/parallel-vs-sequential/components/SequentialStrategy.tsx", note: internals.files.sequential },
      { path: "src/modules/parallel-vs-sequential/components/ParallelStrategy.tsx", note: internals.files.parallel },
      { path: "src/modules/parallel-vs-sequential/components/WaterfallStrategy.tsx", note: internals.files.waterfall },
      { path: "src/modules/parallel-vs-sequential/components/SiblingStrategy.tsx", note: internals.files.siblings },
    ],
  };
}
