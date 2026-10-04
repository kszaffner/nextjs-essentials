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
  },
};
