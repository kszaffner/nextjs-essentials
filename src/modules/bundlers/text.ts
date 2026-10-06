import type { Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type BundlersText = {
  badge: { title: string; hint: string };
  commands: { title: string; turbopack: string; webpack: string };
  internals: {
    treeNotes: Record<string, string>;
    requestsTitle: string;
    requestsHint: string;
    files: { badge: string; commands: string };
  };
};

const text: Record<Locale, BundlersText> = {
  en: {
    badge: {
      title: "This build was produced by",
      hint: "Decided when the page was prerendered; the same page rebuilt with the other flag says the other name.",
    },
    commands: {
      title: "Choosing the bundler",
      turbopack: "Turbopack is the default for both commands:",
      webpack: "Webpack is an opt-in flag:",
    },
    internals: {
      treeNotes: {
        "BuiltWithBadge.tsx": "reads process.env.TURBOPACK, inlined at build time",
        "SwitchCommands.tsx": "the four commands (default and --webpack)",
      },
      requestsTitle: "Script chunks of this page (live)",
      requestsHint:
        "The JavaScript files this page loaded. This is where the two bundlers differ on disk: how many files, and how they are named and split (a Turbopack build includes a turbopack-… runtime chunk). Build the same project with --webpack and compare the list.",
      files: {
        badge: "The one line that tells the bundlers apart at build time.",
        commands: "The commands that choose the bundler.",
      },
    },
  },
  pl: {
    badge: {
      title: "Ten build wyprodukował",
      hint: "Rozstrzygnięte przy prerenderowaniu strony; ta sama strona zbudowana z drugą flagą pokaże drugą nazwę.",
    },
    commands: {
      title: "Wybór bundlera",
      turbopack: "Turbopack jest domyślny dla obu poleceń:",
      webpack: "Webpack to opcja włączana flagą:",
    },
    internals: {
      treeNotes: {
        "BuiltWithBadge.tsx": "czyta process.env.TURBOPACK, wstawione w czasie builda",
        "SwitchCommands.tsx": "cztery polecenia (domyślne i --webpack)",
      },
      requestsTitle: "Chunki skryptów tej strony (na żywo)",
      requestsHint:
        "Pliki JavaScript, które załadowała ta strona. Tu oba bundlery różnią się na dysku: liczbą plików oraz tym, jak są nazwane i podzielone (build Turbopacka zawiera chunk runtime turbopack-…). Zbuduj ten sam projekt z --webpack i porównaj listę.",
      files: {
        badge: "Jedna linia, która w czasie builda odróżnia bundlery.",
        commands: "Polecenia wybierające bundler.",
      },
    },
  },
};

export function getBundlersText(locale: Locale): BundlersText {
  return text[locale];
}

export function getBundlersInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    tree: { root: "src/modules/bundlers/components", notes: internals.treeNotes },
    requests: {
      title: internals.requestsTitle,
      description: internals.requestsHint,
      urlIncludes: "/_next/static/chunks/",
      fileExtension: ".js",
    },
    files: [
      { path: "src/modules/bundlers/components/BuiltWithBadge.tsx", note: internals.files.badge },
      { path: "src/modules/bundlers/components/SwitchCommands.tsx", note: internals.files.commands },
    ],
  };
}
