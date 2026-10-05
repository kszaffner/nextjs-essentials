import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/components/pitfalls/demo";

const basics = (
  <>
    <p>
      Server Components są domyślne. Po Client Component sięgaj tylko dla tego,
      czego serwer nie potrafi:
    </p>
    <ul>
      <li>
        <strong>Server Component</strong>: pobieranie danych, czytanie
        sekretów, rozmowa z bazą danych, trzymanie dużych zależności poza
        przeglądarką.
      </li>
      <li>
        <strong>Client Component</strong>: stan, efekty, event handlery, API
        przeglądarki (<code>window</code>, <code>localStorage</code>) i
        biblioteki, które ich potrzebują.
      </li>
    </ul>
    <p>
      Większość błędów bierze się z zapomnienia, po której stronie jest plik.{" "}
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> zestawia dwa sposoby zbudowania tej
      samej karty: <strong>kliencki liść</strong> (tylko przycisk jest kodem
      klienckim) i <strong>wszystko kliencko</strong> (dyrektywa na całej
      karcie). Obie wyglądają tak samo; różnica jest w bundlu JavaScript, gdzie
      statyczny tekst drugiej karty trafia do każdego odwiedzającego, a pierwszej
      nie. Panel „Pod maską” przeszukuje chunki i pokazuje to na żywo.
    </p>
    <CodeBlock title="app/page.tsx" code={`
// Server Component nie przyjmuje handlerów zdarzeń ani nie trzyma stanu:
export default function Page() {
  return <button onClick={() => console.log("liked")}>Like</button>; // błąd
}

// Poprawka: przenieś do Client Component tylko część interaktywną.
// like-button.tsx
"use client";

import { useState } from "react";

export function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>Like ({likes})</button>;
}
`} />
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Event handler w Server Componencie.</strong>{" "}
      <code>onClick</code> na zwykłym elemencie w Server Componencie wywala
      build:{" "}
      <em>&quot;Event handlers cannot be passed to Client Component
      props.&quot;</em>{" "}
      Wydziel interaktywny element do małego Client Componentu.
    </li>
    <li>
      <strong>Hook w Server Componencie.</strong> Import <code>useState</code>{" "}
      tam kończy się błędem:{" "}
      <em>
        &quot;You&apos;re importing a module that depends on `useState` into a
        React Server Component module. This API is only available in Client
        Components. To fix, mark the file (or its parent) with the
        `&quot;use client&quot;` directive.&quot;
      </em>
    </li>
    <li>
      <strong>API przeglądarki w Server Componencie.</strong>{" "}
      <code>window.innerWidth</code> podczas prerenderingu rzuca{" "}
      <em>ReferenceError: window is not defined</em>. Ten sam kod w Client
      Componencie też wykonuje się raz na serwerze, więc chroń go warunkiem
      albo czytaj po hydracji.
    </li>
    <li>
      <strong>Dyrektywa zbyt wysoko w drzewie.</strong> Oznaczenie layoutu lub
      strony <code>&quot;use client&quot;</code> zamienia wszystko, co importują,
      w kod kliencki, a całe poddrzewo trafia jako JavaScript. Zepchnij
      dyrektywę do interaktywnego liścia.
    </li>
    <li>
      <strong>Wartości niedeterministyczne podczas prerenderingu.</strong> Przy
      Cache Components <code>new Date()</code> lub <code>Math.random()</code> w
      Server Componencie wywala build:{" "}
      <em>
        &quot;Next.js encountered the unstable value `Math.random()` while
        prerendering.&quot;
      </em>{" "}
      Czytaj dane czasu żądania po <code>connection()</code> wewnątrz{" "}
      <code>&lt;Suspense&gt;</code> albo zcache&apos;uj wartość przez{" "}
      <code>&quot;use cache&quot;</code>.
    </li>
    <li>
      <strong>Sekrety docierające do klienta.</strong> Tylko zmienne{" "}
      <code>NEXT_PUBLIC_</code> są wstawiane do bundla klienta; pozostałe stają
      się tam pustymi stringami. Oznacz moduły dostępu do danych jako{" "}
      <code>server-only</code>, by import z klienta wywalał build.
    </li>
    <li>
      <strong>Przekazanie przez granicę czegoś nieodpowiedniego.</strong>{" "}
      Funkcje i instancje klas nie mogą być propsami (zobacz{" "}
      <LocalizedLink href="/components/use-client-boundary">granicę use client</LocalizedLink>
      ).
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Dlaczego komponenty są domyślnie Server Components?",
    answer: (
      <p>
        Bo większość UI nie potrzebuje interaktywności, a Server Component nie
        wysyła JavaScriptu dla siebie, może czytać dane i sekrety bezpośrednio i
        trzyma ciężkie zależności poza przeglądarką. Do klienta przechodzisz
        tylko tam, gdzie potrzebny jest stan, efekty lub API przeglądarki.
      </p>
    ),
  },
  {
    question: "Co się stanie, gdy użyjesz useState lub onClick w Server Componencie?",
    answer: (
      <p>
        Build kończy się jawnym błędem: hooki dają &quot;This API is only
        available in Client Components&quot;, a event handlery &quot;Event
        handlers cannot be passed to Client Component props&quot;. Napraw to,
        przenosząc część interaktywną do Client Componentu.
      </p>
    ),
  },
  {
    question: "Gdzie umieścić \"use client\" i dlaczego to ważne?",
    answer: (
      <p>
        Na najmniejszym interaktywnym liściu. Dyrektywa obejmuje cały graf
        modułów pod nią, więc dyrektywa na stronie lub layoucie wysyła do
        przeglądarki cały kod tego poddrzewa. W demie tekst z karty „wszystko
        kliencko” pojawia się w klienckich chunkach, a tekst karty z liściem nie.
      </p>
    ),
  },
  {
    question: "Dlaczego new Date() tu zawodzi w Server Componencie?",
    answer: (
      <p>
        Przy Cache Components komponent jest domyślnie prerenderowany do
        statycznej powłoki, a bieżący czas lub liczba losowa zostałyby zamrożone
        w czasie builda. Next.js to odrzuca: czytaj takie wartości w czasie
        żądania (po <code>connection()</code>, wewnątrz{" "}
        <code>&lt;Suspense&gt;</code>) albo zcache&apos;uj je świadomie.
      </p>
    ),
  },
  {
    question: "Jak trzymać sekrety i kod tylko serwerowy poza klientem?",
    answer: (
      <p>
        Nie dodawaj prefiksu <code>NEXT_PUBLIC_</code> do sekretów (zmienne bez
        prefiksu są puste w bundlu klienta) i importuj <code>server-only</code>{" "}
        w modułach dostępu do danych, by import z klienta wywalał build.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Pułapki",
  summary: "Domyślne zachowanie komponentów serwerowych i błędy, które sprowokuje.",
  basics,
  edgeCases,
  interviewQuestions,
};
