import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type StreamingText = {
  blocks: { fast: string; medium: string; slow: string; all: string };
  separate: { title: string; hint: string };
  shared: { title: string; hint: string };
  resolvedAfter: (milliseconds: number) => string;
  waiting: string;
  internals: { streamTitle: string; streamHint: string; files: { demo: string; slow: string } };
};

const text: Record<Locale, StreamingText> = {
  en: {
    blocks: { fast: "Fast", medium: "Medium", slow: "Slow", all: "All three" },
    separate: {
      title: "One boundary per block",
      hint: "Each block appears as soon as it is ready: about 0.3 s, 1.2 s, and 2.4 s after the shell.",
    },
    shared: {
      title: "One shared boundary",
      hint: "The boundary resolves when its slowest child does, so all three appear together after about 2.4 s (they render in parallel, not one after another).",
    },
    resolvedAfter: (milliseconds) => `resolved after ${milliseconds} ms`,
    waiting: "waiting… (Suspense fallback)",
    internals: {
      streamTitle: "The response as a stream (live)",
      streamHint:
        "Fetches this page and reads the body as it arrives. The first chunk is the static shell with the fallbacks; the following ones carry the blocks as they resolve (about 0.3 s, 1.2 s and 2.4 s).",
      files: {
        demo: "One Suspense boundary per block, and one boundary around all three.",
        slow: "A Server Component that awaits connection() and a delay, so it really resolves while streaming.",
      },
    },
  },
  pl: {
    blocks: { fast: "Szybki", medium: "Średni", slow: "Wolny", all: "Wszystkie trzy" },
    separate: {
      title: "Jedna granica na blok",
      hint: "Każdy blok pojawia się, gdy tylko jest gotowy: po około 0,3 s, 1,2 s i 2,4 s od powłoki.",
    },
    shared: {
      title: "Jedna wspólna granica",
      hint: "Granica rozwiązuje się, gdy najwolniejsze dziecko się skończy, więc wszystkie trzy pojawiają się razem po około 2,4 s (renderują się równolegle, nie jeden po drugim).",
    },
    resolvedAfter: (milliseconds) => `rozwiązano po ${milliseconds} ms`,
    waiting: "oczekiwanie… (fallback Suspense)",
    internals: {
      streamTitle: "Odpowiedź jako strumień (na żywo)",
      streamHint:
        "Pobiera tę stronę i czyta ciało w miarę nadchodzenia. Pierwszy fragment to statyczna powłoka z fallbackami; kolejne niosą bloki, gdy się rozwiązują (około 0,3 s, 1,2 s i 2,4 s).",
      files: {
        demo: "Jedna granica Suspense na blok i jedna granica wokół wszystkich trzech.",
        slow: "Server Component, który czeka na connection() i opóźnienie, więc naprawdę rozwiązuje się w trakcie streamingu.",
      },
    },
  },
};

export function getStreamingText(locale: Locale): StreamingText {
  return text[locale];
}

export function getStreamingInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    stream: { title: internals.streamTitle, description: internals.streamHint, path: "/rendering/streaming/demo" },
    files: [
      { path: "src/modules/streaming/components/StreamingDemo.tsx", note: internals.files.demo },
      { path: "src/modules/streaming/components/SlowBlock.tsx", note: internals.files.slow },
    ],
  };
}
