import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

export type SlotKey = "main" | "mainFallback" | "team" | "teamSettings" | "analyticsLoading" | "analyticsFallback";

type SlotCopy = { slotName: string; title: string; message: string };

type ParallelRoutesText = {
  navigationLabel: string;
  links: { home: string; soft: string; hard: string };
  slots: Record<SlotKey, SlotCopy>;
  analytics: { slotName: string; title: string; body: (milliseconds: number) => string };
  internals: {
    treeNotes: Record<string, string>;
    requestsTitle: string;
    requestsHint: string;
    files: { layout: string; teamSettings: string; analyticsLoading: string; defaultFile: string };
  };
};

const text: Record<Locale, ParallelRoutesText> = {
  en: {
    navigationLabel: "Parallel routes demo",
    links: { home: "/demo", soft: "/demo/settings (soft navigation)", hard: "/demo/settings (full page load)" },
    slots: {
      main: { slotName: "children (demo/page.tsx)", title: "Main", message: "The implicit children slot." },
      mainFallback: {
        slotName: "children (demo/default.tsx)",
        title: "Main fallback",
        message: "Shown after a full page load on a URL where only some slots match.",
      },
      team: { slotName: "@team/page.tsx", title: "Team", message: "The team slot at /demo." },
      teamSettings: {
        slotName: "@team/settings/page.tsx",
        title: "Team settings",
        message: "Only the team slot has a settings page.",
      },
      analyticsLoading: {
        slotName: "@analytics/loading.tsx",
        title: "Analytics (loading)",
        message: "This slot has its own loading state.",
      },
      analyticsFallback: {
        slotName: "@analytics/default.tsx",
        title: "Analytics fallback",
        message: "This slot has no settings page, so after a full page load on /demo/settings it renders default.tsx.",
      },
    },
    analytics: {
      slotName: "@analytics/page.tsx",
      title: "Analytics",
      body: (milliseconds) => `Rendered after ${milliseconds} ms, independently of the other slots.`,
    },
    internals: {
      treeNotes: {
        "layout.tsx": "receives team, analytics and children as props",
        "page.tsx": "the implicit children slot",
        "default.tsx": "children fallback after a hard navigation",
        "@team": "slot: becomes the team prop, not a URL segment",
        "@team/settings/page.tsx": "only this slot matches /settings",
        "@analytics": "slot: becomes the analytics prop",
        "@analytics/loading.tsx": "the slot's own Suspense fallback",
        "@analytics/default.tsx": "analytics fallback after a hard navigation",
      },
      requestsTitle: "Navigation requests (live)",
      requestsHint:
        "Click the soft navigation link: one _rsc request updates only the matching slot. Use the full page load link, and the layout is served again with the fallbacks. Press “Clear the list” first to see only what your next click requests.",
      files: {
        layout: "The layout destructures the slots from its props and decides where each one renders.",
        teamSettings: "The only slot with a settings page: on a soft navigation just this panel changes.",
        analyticsLoading: "The slot's own loading UI, shown while the slow analytics page streams in.",
        defaultFile: "Rendered for children after a full page load on a URL where only some slots match.",
      },
    },
  },
  pl: {
    navigationLabel: "Demo tras równoległych",
    links: { home: "/demo", soft: "/demo/settings (miękka nawigacja)", hard: "/demo/settings (pełne przeładowanie)" },
    slots: {
      main: { slotName: "children (demo/page.tsx)", title: "Główny", message: "Niejawny slot children." },
      mainFallback: {
        slotName: "children (demo/default.tsx)",
        title: "Fallback głównego",
        message: "Pokazywany po pełnym przeładowaniu na URL, do którego pasują tylko niektóre sloty.",
      },
      team: { slotName: "@team/page.tsx", title: "Zespół", message: "Slot zespołu pod /demo." },
      teamSettings: {
        slotName: "@team/settings/page.tsx",
        title: "Ustawienia zespołu",
        message: "Tylko slot zespołu ma stronę ustawień.",
      },
      analyticsLoading: {
        slotName: "@analytics/loading.tsx",
        title: "Analityka (ładowanie)",
        message: "Ten slot ma własny stan ładowania.",
      },
      analyticsFallback: {
        slotName: "@analytics/default.tsx",
        title: "Fallback analityki",
        message: "Ten slot nie ma strony ustawień, więc po pełnym przeładowaniu na /demo/settings renderuje default.tsx.",
      },
    },
    analytics: {
      slotName: "@analytics/page.tsx",
      title: "Analityka",
      body: (milliseconds) => `Wyrenderowano po ${milliseconds} ms, niezależnie od pozostałych slotów.`,
    },
    internals: {
      treeNotes: {
        "layout.tsx": "dostaje team, analytics i children jako propsy",
        "page.tsx": "niejawny slot children",
        "default.tsx": "fallback children po twardej nawigacji",
        "@team": "slot: staje się propem team, nie segmentem URL",
        "@team/settings/page.tsx": "tylko ten slot pasuje do /settings",
        "@analytics": "slot: staje się propem analytics",
        "@analytics/loading.tsx": "własny fallback Suspense tego slotu",
        "@analytics/default.tsx": "fallback analityki po twardej nawigacji",
      },
      requestsTitle: "Żądania nawigacji (na żywo)",
      requestsHint:
        "Kliknij link miękkiej nawigacji: jedno żądanie _rsc aktualizuje tylko pasujący slot. Użyj linku pełnego przeładowania, a layout zostanie serwowany ponownie z fallbackami. Najpierw naciśnij „Wyczyść listę”, by zobaczyć tylko to, czego zażąda następne kliknięcie.",
      files: {
        layout: "Layout destrukturyzuje sloty z propsów i decyduje, gdzie każdy się renderuje.",
        teamSettings: "Jedyny slot ze stroną ustawień: przy miękkiej nawigacji zmienia się tylko ten panel.",
        analyticsLoading: "Własny interfejs ładowania slotu, widoczny, gdy wolna strona analityki się streamuje.",
        defaultFile: "Renderowany dla children po pełnym przeładowaniu na URL, do którego pasują tylko niektóre sloty.",
      },
    },
  },
};

export function getParallelRoutesText(locale: Locale): ParallelRoutesText {
  return text[locale];
}

export function useParallelRoutesText(): ParallelRoutesText {
  return text[useLocale()];
}

const demoFolder = "src/app/[lang]/fundamentals/parallel-routes/demo";

export function getParallelRoutesInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: demoFolder, notes: internals.treeNotes },
    requests: { title: internals.requestsTitle, description: internals.requestsHint, urlIncludes: "_rsc=" },
    files: [
      { path: `${demoFolder}/layout.tsx`, note: internals.files.layout },
      { path: `${demoFolder}/@team/settings/page.tsx`, note: internals.files.teamSettings },
      { path: `${demoFolder}/@analytics/loading.tsx`, note: internals.files.analyticsLoading },
      { path: `${demoFolder}/default.tsx`, note: internals.files.defaultFile },
    ],
  };
}
