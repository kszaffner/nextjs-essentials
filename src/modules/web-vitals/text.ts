import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";
import type { VitalRating } from "./vitalsRating";

type WebVitalsText = {
  title: string;
  empty: string;
  columns: { metric: string; value: string; rating: string };
  ratings: Record<VitalRating, string>;
  notAvailable: string;
  button: (clicks: number) => string;
  hint: string;
  internals: {
    treeNotes: Record<string, string>;
    files: { collector: string; panel: string; rating: string; layout: string };
  };
};

const text: Record<Locale, WebVitalsText> = {
  en: {
    title: "Metrics reported in this tab",
    empty: "Nothing reported yet.",
    columns: { metric: "Metric", value: "Value", rating: "Rating" },
    ratings: { good: "good", "needs improvement": "needs improvement", poor: "poor" },
    notAvailable: "n/a",
    button: (clicks) => `Interact with the page (${clicks})`,
    hint: "TTFB and FCP appear on load. LCP is final after your first interaction or when the tab is hidden, and INP needs an interaction: press the button.",
    internals: {
      treeNotes: {
        "WebVitalsCollector.tsx": "renders nothing; calls useReportWebVitals (Client Component)",
        "VitalsPanel.tsx": "shows the stored metrics with a rating",
      },
      files: {
        collector: "The whole collector: a stable callback passed to the hook, and a null render.",
        panel: "Reads the store with useSyncExternalStore and rates each metric.",
        rating: "Google's published thresholds, the only logic worth unit testing.",
        layout: "Where the collector is mounted, once, for every page.",
      },
    },
  },
  pl: {
    title: "Metryki zgłoszone w tej karcie",
    empty: "Nic jeszcze nie zgłoszono.",
    columns: { metric: "Metryka", value: "Wartość", rating: "Ocena" },
    ratings: { good: "dobre", "needs improvement": "do poprawy", poor: "słabe" },
    notAvailable: "brak",
    button: (clicks) => `Wejdź w interakcję ze stroną (${clicks})`,
    hint: "TTFB i FCP pojawiają się przy załadowaniu. LCP jest ostateczne po pierwszej interakcji lub gdy karta zostanie ukryta, a INP potrzebuje interakcji: naciśnij przycisk.",
    internals: {
      treeNotes: {
        "WebVitalsCollector.tsx": "niczego nie renderuje; wywołuje useReportWebVitals (Client Component)",
        "VitalsPanel.tsx": "pokazuje zapisane metryki z oceną",
      },
      files: {
        collector: "Cały kolektor: stabilny callback przekazany do hooka i render null.",
        panel: "Czyta magazyn przez useSyncExternalStore i ocenia każdą metrykę.",
        rating: "Opublikowane progi Google, jedyna logika warta testu jednostkowego.",
        layout: "Miejsce zamontowania kolektora, raz, dla każdej strony.",
      },
    },
  },
};

export function useWebVitalsText(): WebVitalsText {
  return text[useLocale()];
}

export function getWebVitalsInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: "src/modules/web-vitals", notes: internals.treeNotes },
    files: [
      { path: "src/modules/web-vitals/components/WebVitalsCollector.tsx", note: internals.files.collector },
      { path: "src/modules/web-vitals/components/VitalsPanel.tsx", note: internals.files.panel },
      { path: "src/modules/web-vitals/vitalsRating.ts", note: internals.files.rating },
      { path: "src/app/[lang]/layout.tsx", note: internals.files.layout },
    ],
  };
}
