import { useLocale, type Locale } from "@/shared/i18n";
import type { InternalsSpec } from "@/shared/under-the-hood";

type UseClientBoundaryText = {
  inspector: {
    caption: string;
    columns: { prop: string; typeof: string; constructor: string; value: string };
    keyGone: string;
  };
  internals: {
    payloadTitle: string;
    payloadHint: string;
    files: { demo: string; inspector: string };
  };
};

const text: Record<Locale, UseClientBoundaryText> = {
  en: {
    inspector: {
      caption: "Sent from a Server Component, received in a Client Component",
      columns: { prop: "Prop", typeof: "typeof", constructor: "constructor", value: "Value" },
      keyGone: " (the key itself is gone)",
    },
    internals: {
      payloadTitle: "The RSC payload (live)",
      payloadHint:
        "Fetches this page the way a client navigation does and shows the payload lines that carry the props. A Date travels as $D…, a bigint as $n…, a Map as $Q…, a Set as $W…, undefined as $undefined: that is how they survive the boundary.",
      files: {
        demo: "The Server Component that builds the values and hands them to the Client Component.",
        inspector: "The Client Component marked with \"use client\": it only sees what the payload carried.",
      },
    },
  },
  pl: {
    inspector: {
      caption: "Wysłane z Server Componentu, odebrane w Client Componencie",
      columns: { prop: "Prop", typeof: "typeof", constructor: "constructor", value: "Wartość" },
      keyGone: " (samego klucza już nie ma)",
    },
    internals: {
      payloadTitle: "Ładunek RSC (na żywo)",
      payloadHint:
        "Pobiera tę stronę tak, jak robi to nawigacja po stronie klienta, i pokazuje linie ładunku niosące propsy. Date jedzie jako $D…, bigint jako $n…, Map jako $Q…, Set jako $W…, undefined jako $undefined: tak przeżywają granicę.",
      files: {
        demo: "Server Component, który buduje wartości i przekazuje je Client Componentowi.",
        inspector: "Client Component oznaczony \"use client\": widzi tylko to, co przyniósł ładunek.",
      },
    },
  },
};

export function useUseClientBoundaryText(): UseClientBoundaryText {
  return text[useLocale()];
}

export function getUseClientBoundaryInternals(locale: Locale): InternalsSpec {
  const { internals } = text[locale];

  return {
    payload: {
      title: internals.payloadTitle,
      description: internals.payloadHint,
      path: "/components/use-client-boundary/demo",
      lineIncludes: 'sentKeys":[',
    },
    files: [
      { path: "src/modules/use-client-boundary/components/SerializationDemo.tsx", note: internals.files.demo },
      { path: "src/modules/use-client-boundary/components/PropInspector.tsx", note: internals.files.inspector },
    ],
  };
}
