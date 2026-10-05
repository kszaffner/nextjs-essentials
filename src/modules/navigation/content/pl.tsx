import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoPath = "/fundamentals/navigation/demo";

const basics = (
  <>
    <p>
      Next.js nawiguje po stronie klienta: pobiera ładunek React Server
      Component następnej trasy i podmienia go bez pełnego przeładowania
      strony, a wspólne layouty pozostają zamontowane. Narzędzia:
    </p>
    <ul>
      <li>
        <code>&lt;Link&gt;</code> (z <code>next/link</code>) to domyślny
        sposób nawigacji. Prefetchuje, obsługuje <code>replace</code> i{" "}
        <code>scroll</code> i renderuje prawdziwe <code>&lt;a&gt;</code>.
      </li>
      <li>
        <code>useRouter()</code> (z <code>next/navigation</code>) nawiguje z
        kodu: <code>push</code>, <code>replace</code>, <code>back</code>,{" "}
        <code>forward</code>, <code>refresh</code> i <code>prefetch</code>.
      </li>
      <li>
        <code>usePathname()</code> i <code>useSearchParams()</code> czytają
        bieżący URL w Client Componencie i aktualizują się przy nawigacji.
      </li>
    </ul>
    <p>
      <strong>Prefetching.</strong> <code>&lt;Link&gt;</code> prefetchuje swoją
      trasę, gdy wejdzie w viewport (tylko w buildach produkcyjnych). Trasa
      statyczna jest prefetchowana w całości; trasa dynamiczna tylko do
      najbliższego <code>loading.tsx</code>, a bez niego wcale. Przekaż{" "}
      <code>prefetch={"{false}"}</code>, by z tego zrezygnować, albo wywołaj{" "}
      <code>router.prefetch()</code>, by rozgrzać trasę na żądanie.
    </p>
    <p>
      Wypróbuj <LocalizedLink href={demoPath}>plac zabaw</LocalizedLink>: pokazuje bieżącą
      ścieżkę i search params, a przyciski uruchamiają metody routera.
      <code> router.refresh()</code> renderuje ponownie zegar serwera pod
      spodem bez zerowania stanu klienta.
    </p>
    <CodeBlock title="navigation.tsx" code={`
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Toolbar() {
  const pathname = usePathname();          // "/en/docs"
  const searchParams = useSearchParams();  // ?tab=api (wymaga granicy Suspense)
  const router = useRouter();

  return (
    <nav>
      <Link href="/docs">Docs</Link>                   {/* prefetch na produkcji */}
      <Link href="/docs" prefetch={false}>Docs</Link>   {/* bez prefetchu */}
      <button onClick={() => router.push("/docs?tab=api")}>Open API</button>
      <button onClick={() => router.replace("/docs")}>Replace</button>
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => router.refresh()}>Refresh</button>
    </nav>
  );
}
`} />
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Importuj z <code>next/navigation</code>.</strong>{" "}
      <code>next/router</code> to API Pages Routera i nie działa w App
      Routerze (pokazujemy je tu tylko dla kontrastu).
    </li>
    <li>
      <strong>
        <code>useSearchParams()</code> wymaga granicy{" "}
        <code>&lt;Suspense&gt;</code> przy Cache Components.
      </strong>{" "}
      Search params to dane runtime; bez granicy build się nie powiedzie
      (strona placu zabaw ją ma). To samo dotyczy każdego Server Componentu
      zależnego od żądania.
    </li>
    <li>
      <strong>Prefetching jest wyłączony w trybie developerskim.</strong>{" "}
      Działa tylko w buildach produkcyjnych, więc szybkość nawigacji testuj na{" "}
      <code>next build</code> + <code>next start</code>.
    </li>
    <li>
      <strong><code>&lt;Link&gt;</code> musi się zhydratować, zanim zacznie prefetchować.</strong>{" "}
      Duży bundle JavaScript opóźnia hydrację, a z nią prefetching.
    </li>
    <li>
      <strong>Trasy dynamiczne bez <code>loading.tsx</code> nie są prefetchowane</strong>{" "}
      (albo tylko częściowo), więc kliknięcie czeka na serwer. Dodaj{" "}
      <code>loading.tsx</code> lub granicę <code>&lt;Suspense&gt;</code>.
    </li>
    <li>
      <strong><code>push</code> a <code>replace</code>.</strong>{" "}
      <code>push</code> dodaje wpis do historii, <code>replace</code> nadpisuje
      bieżący, więc przycisk wstecz go pomija.{" "}
      <code>&lt;Link replace&gt;</code> robi to samo deklaratywnie.
    </li>
    <li>
      <strong>
        <code>router.refresh()</code> pobiera ponownie wynik serwera, nie stan
        klienta.
      </strong>{" "}
      Server Components renderują się ponownie; stan Client Componentów jest
      zachowany.
    </li>
    <li>
      <strong>Layouty nie renderują się ponownie przy nawigacji,</strong> więc
      aktywny link podświetlaj przez <code>usePathname()</code> w Client
      Componencie (robi tak pasek boczny tej strony).
    </li>
    <li>
      <strong>Prefetchowane dane mogą się zestarzeć.</strong> Prefetchowane
      ładunki są cache&apos;owane po stronie klienta (domyślnie 5 minut dla tras
      statycznych) i odświeżane przy późniejszym prefetchu.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak działa prefetching w Link i kiedy się uruchamia?",
    answer: (
      <p>
        Gdy <code>&lt;Link&gt;</code> wejdzie w viewport, Next.js prefetchuje
        trasę w tle, planując pracę tak, by wiele linków nie zalało sieci.
        Działa tylko na produkcji. Trasy statyczne są prefetchowane w całości;
        dynamiczne tylko do najbliższej granicy <code>loading.tsx</code>.
      </p>
    ),
  },
  {
    question: "Jak wyłączyć lub kontrolować prefetching?",
    answer: (
      <p>
        <code>&lt;Link prefetch={"{false}"}&gt;</code> wyłącza go całkowicie,
        także po najechaniu myszą. <code>prefetch={"{true}"}</code> prefetchuje
        całą trasę. Dla własnego zachowania, np. prefetchu tylko po najechaniu,
        wywołaj <code>router.prefetch()</code> samodzielnie.
      </p>
    ),
  },
  {
    question: "Czym różnią się router.push, router.replace i router.refresh?",
    answer: (
      <p>
        <code>push</code> nawiguje i dodaje wpis do historii;{" "}
        <code>replace</code> nawiguje bez dodawania wpisu. <code>refresh</code>{" "}
        zostaje na tym samym URL i pobiera ponownie wynik Server Components,
        zachowując stan klienta.
      </p>
    ),
  },
  {
    question: "Dlaczego useSearchParams potrzebuje Suspense w tym projekcie?",
    answer: (
      <p>
        Przy Cache Components search params są znane dopiero w czasie żądania,
        więc Client Component, który je czyta, nie może być częścią
        prerenderowanej statycznej powłoki. Otaczający{" "}
        <code>&lt;Suspense&gt;</code> pozwala Next.js prerenderować powłokę i
        streamować część zależną od URL.
      </p>
    ),
  },
  {
    question: "Jak podświetlić aktywny link w layoucie?",
    answer: (
      <p>
        Layouty nie renderują się ponownie przy nawigacji, więc odczytaj{" "}
        <code>usePathname()</code> w małym Client Componencie (linku
        nawigacji) i porównaj z <code>href</code> linku. Przy Cache Components
        opakuj go w <code>&lt;Suspense&gt;</code> dla tras z parametrami
        dynamicznymi.
      </p>
    ),
  },
  {
    question: "next/router czy next/navigation?",
    answer: (
      <p>
        <code>next/navigation</code> w App Routerze. <code>next/router</code>{" "}
        należy do Pages Routera i w App Routerze rzuca błąd.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Nawigacja",
  summary: "Link, useRouter, usePathname, useSearchParams i prefetching.",
  basics,
  edgeCases,
  interviewQuestions,
};
