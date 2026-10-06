import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

export type SiteFilesText = {
  title: string;
  prompt: string;
  fetchSitemap: string;
  fetchRobots: string;
  fetching: (path: string) => string;
  none: string;
  more: (count: number) => string;
  failed: (path: string, reason: string) => string;
  unknownError: string;
};

type SitemapRobotsText = {
  viewer: SiteFilesText;
  internals: {
    requestsTitle: string;
    requestsHint: string;
    files: { sitemap: string; robots: string; builders: string };
  };
};

const text: Record<Locale, SitemapRobotsText> = {
  en: {
    viewer: {
      title: "The generated files",
      prompt: "Press a button to fetch a file.",
      fetchSitemap: "Fetch /sitemap.xml",
      fetchRobots: "Fetch /robots.txt",
      fetching: (path) => `Fetching ${path}…`,
      none: "(none)",
      more: (count) => `… (${count} more lines)`,
      failed: (path, reason) => `Could not fetch ${path}: ${reason}`,
      unknownError: "unknown error",
    },
    internals: {
      requestsTitle: "Requests for the sitemap (live)",
      requestsHint:
        "Press Fetch /sitemap.xml: the file is a prerendered response, so the browser lists it like any other resource, with its transfer size.",
      files: {
        sitemap: "sitemap.ts: composes the pure builder with the topic catalog and the site URL.",
        robots: "robots.ts: the same, for robots.txt.",
        builders: "The pure builders: a base URL and a list in, a typed object out, so they are unit tested.",
      },
    },
  },
  pl: {
    viewer: {
      title: "Wygenerowane pliki",
      prompt: "Naciśnij przycisk, by pobrać plik.",
      fetchSitemap: "Pobierz /sitemap.xml",
      fetchRobots: "Pobierz /robots.txt",
      fetching: (path) => `Pobieranie ${path}…`,
      none: "(brak)",
      more: (count) => `… (jeszcze ${count} linii)`,
      failed: (path, reason) => `Nie udało się pobrać ${path}: ${reason}`,
      unknownError: "nieznany błąd",
    },
    internals: {
      requestsTitle: "Żądania o sitemap (na żywo)",
      requestsHint:
        "Naciśnij Pobierz /sitemap.xml: plik to prerenderowana odpowiedź, więc przeglądarka wymienia go jak każdy inny zasób, z rozmiarem transferu.",
      files: {
        sitemap: "sitemap.ts: łączy czysty builder z katalogiem tematów i URL-em witryny.",
        robots: "robots.ts: to samo, dla robots.txt.",
        builders: "Czyste buildery: wchodzi bazowy URL i lista, wychodzi typowany obiekt, więc są testowane jednostkowo.",
      },
    },
  },
};

export function getSitemapRobotsText(locale: Locale): SitemapRobotsText {
  return text[locale];
}

export function getSitemapRobotsInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    requests: { title: internals.requestsTitle, description: internals.requestsHint, urlIncludes: "sitemap.xml" },
    files: [
      { path: "src/app/sitemap.ts", note: internals.files.sitemap },
      { path: "src/app/robots.ts", note: internals.files.robots },
      { path: "src/modules/sitemap-robots/buildSiteFiles.ts", note: internals.files.builders },
    ],
  };
}
