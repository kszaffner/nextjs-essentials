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
    columns: { file: string; start: string; size: string; chunk: string; time: string };
    streamButton: string;
    loadPayload: string;
    searchChunks: string;
    searchResult: (searched: number, foundIn: readonly string[]) => string;
    nothingMatched: string;
    shellChunk: string;
    clear: string;
    fetchHeaders: string;
    fetchFailed: string;
    absent: string;
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
      columns: { file: "Plik", start: "Start", size: "Rozmiar", chunk: "Fragment", time: "Czas" },
      streamButton: "Pobierz stronę strumieniem i zmierz fragmenty",
      loadPayload: "Pobierz ładunek RSC",
      searchChunks: "Przeszukaj załadowane chunki JavaScript",
      searchResult: (searched, foundIn) =>
        foundIn.length === 0
          ? `Przeszukano ${searched} chunków: tekstu nie ma w żadnym. Nie trafił do przeglądarki.`
          : `Przeszukano ${searched} chunków: tekst jest w ${foundIn.join(", ")}.`,
      nothingMatched: "(żadna linia ładunku nie pasuje)",
      shellChunk: "#1 (powłoka)",
      clear: "Wyczyść listę",
      fetchHeaders: "Pobierz strony i pokaż nagłówki",
      fetchFailed: "Nie udało się pobrać strony. Spróbuj ponownie.",
      absent: "(brak)",
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
      columns: { file: "File", start: "Start", size: "Size", chunk: "Chunk", time: "Time" },
      streamButton: "Stream the page and time the chunks",
      loadPayload: "Fetch the RSC payload",
      searchChunks: "Search the loaded JavaScript chunks",
      searchResult: (searched, foundIn) =>
        foundIn.length === 0
          ? `Searched ${searched} chunks: the text is in none of them. It was not shipped to the browser.`
          : `Searched ${searched} chunks: the text is in ${foundIn.join(", ")}.`,
      nothingMatched: "(no payload line matches)",
      shellChunk: "#1 (shell)",
      clear: "Clear the list",
      fetchHeaders: "Fetch the pages and show headers",
      fetchFailed: "The page could not be fetched. Try again.",
      absent: "(absent)",
      cached: "cached",
    },
  },
};
