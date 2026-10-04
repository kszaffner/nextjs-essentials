import type { Locale } from "./config";

// Interface chrome shared by every page. Topic content lives in each module.
export type Messages = {
  siteTitle: string;
  siteDescription: string;
  topicsNavigation: string;
  backToTopics: string;
  languageSwitcher: string;
  indexLead: string;
  topicPage: {
    basics: string;
    edgeCases: string;
    interviewQuestions: string;
    noQuestions: string;
  };
  notFound: { title: string; renderedBy: (source: string) => string };
  underTheHood: {
    title: string;
    lead: string;
    filesTitle: string;
    treeTitle: string;
    networkTitle: string;
    moreLines: (count: number) => string;
    requestsMatching: (urlPart: string, count: number) => string;
    columns: { file: string; start: string; size: string };
    clear: string;
    cached: string;
  };
};

export const messages: Record<Locale, Messages> = {
  pl: {
    siteTitle: "nextjs-essentials",
    siteDescription: "Kompendium Next.js App Router gotowe na rozmowę kwalifikacyjną.",
    topicsNavigation: "Tematy",
    backToTopics: "Wróć do wszystkich tematów",
    languageSwitcher: "Język",
    indexLead:
      "Kompendium Next.js App Router gotowe na rozmowę kwalifikacyjną. Każdy temat ma sekcje Podstawy, Przypadki brzegowe i Pytania rekrutacyjne.",
    topicPage: {
      basics: "Podstawy",
      edgeCases: "Przypadki brzegowe",
      interviewQuestions: "Pytania rekrutacyjne",
      noQuestions: "Brak pytań.",
    },
    notFound: { title: "Nie znaleziono strony", renderedBy: (source) => `Wyrenderowane przez ${source}.` },
    underTheHood: {
      title: "Pod maską",
      lead: "Dowody z tego dema: pomiary na żywo i prawdziwe pliki projektu, które za nim stoją.",
      filesTitle: "Pliki w projekcie",
      treeTitle: "Struktura folderu",
      networkTitle: "Żądania sieciowe (na żywo)",
      moreLines: (count) => `… jeszcze ${count} linii w pliku.`,
      requestsMatching: (urlPart, count) => `Żądania zawierające „${urlPart}”: ${count}`,
      columns: { file: "Plik", start: "Start", size: "Rozmiar" },
      clear: "Wyczyść listę",
      cached: "z cache",
    },
  },
  en: {
    siteTitle: "nextjs-essentials",
    siteDescription: "An interview-ready compendium of the Next.js App Router.",
    topicsNavigation: "Topics",
    backToTopics: "Back to all topics",
    languageSwitcher: "Language",
    indexLead:
      "An interview-ready compendium of the Next.js App Router. Every topic has Basics, Edge cases, and Interview questions.",
    topicPage: {
      basics: "Basics",
      edgeCases: "Edge cases",
      interviewQuestions: "Interview questions",
      noQuestions: "No questions yet.",
    },
    notFound: { title: "Page not found", renderedBy: (source) => `Rendered by ${source}.` },
    underTheHood: {
      title: "Under the hood",
      lead: "Evidence from this demo: live measurements and the real project files behind it.",
      filesTitle: "Files in the project",
      treeTitle: "Folder structure",
      networkTitle: "Network requests (live)",
      moreLines: (count) => `… ${count} more lines in the file.`,
      requestsMatching: (urlPart, count) => `Requests containing "${urlPart}": ${count}`,
      columns: { file: "File", start: "Start", size: "Size" },
      clear: "Clear the list",
      cached: "cached",
    },
  },
};
