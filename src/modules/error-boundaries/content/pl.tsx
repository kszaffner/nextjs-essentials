import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/errors/error-boundaries/demo";

export const basics = (
  <>
    <p>
      Plik <code>error.tsx</code> zamienia segment trasy w{" "}
      <strong>error boundary Reacta</strong>. Gdy coś rzuci podczas renderu
      segmentu (lub czegokolwiek pod nim), boundary pokazuje wyeksportowany
      komponent, a reszta aplikacji działa dalej. Musi to być Client Component.
    </p>
    <CodeBlock code={`"use client";

export default function Error({ error, retry }: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <button onClick={() => retry()}>Spróbuj ponownie</button>;
}`} />
    <ul>
      <li>
        Wygrywa <strong>najbliższy</strong> boundary nad komponentem, który się
        wywalił. Zagnieżdżanie daje precyzyjne fallbacki.
      </li>
      <li>
        <code>retry()</code> pobiera dane i renderuje segment od nowa;{" "}
        <code>reset()</code> tylko czyści stan błędu i renderuje ponownie bez
        pobierania.
      </li>
      <li>
        <code>global-error.tsx</code> (w korzeniu <code>app</code>) to ostatnia
        deska ratunku: zastępuje root layout, więc renderuje własne{" "}
        <code>&lt;html&gt;</code> i <code>&lt;body&gt;</code>. Ten projekt ma
        taki plik i raportuje do monitora błędów.
      </li>
    </ul>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> ma na buildzie
      produkcyjnym trzy scenariusze: strona, która rzuca, layout, który rzuca, i
      handler zdarzenia, który rzuca. Każda wadliwa trasa i segment nadrzędny mają
      własny <code>error.tsx</code>, a fallback wskazuje plik, który złapał
      błąd.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Boundary segmentu nie opakowuje jego własnego layoutu.</strong>{" "}
      Rzucający <code>layout-crash/layout.tsx</code> <em>nie</em> został złapany
      przez <code>layout-crash/error.tsx</code>, tylko przez{" "}
      <code>demo/error.tsx</code> segmentu nadrzędnego, bo boundary leży pod
      layoutem. Błędy w root layoucie wymagają <code>global-error.tsx</code>.
    </li>
    <li>
      <strong>Przeglądarka nigdy nie dostaje prawdziwego komunikatu.</strong> Przy
      błędzie Server Component fallback dostał ogólny komunikat (zminifikowany
      błąd Reacta) i <code>digest</code>; tekst „table users, column ssn” został
      na serwerze. Log serwera zawierał prawdziwy komunikat i ten sam{" "}
      <code>digest</code>, więc można dopasować zgłoszenie użytkownika do linii
      w logu.
    </li>
    <li>
      <strong>Handlery zdarzeń nie są objęte.</strong> Boundary łapią błędy
      rzucone podczas renderu Reacta. Throw w <code>onClick</code> wywołał błąd
      okna, ale żaden boundary się nie pojawił, a strona została taka, jaka była.
      Użyj <code>try/catch</code> w handlerze i zamień błąd w stan UI.
    </li>
    <li>
      <strong>Kod statusu mógł już zostać wysłany.</strong> Błąd strony
      strumieniowany po powłoce zostawia status HTTP <code>200</code> (test{" "}
      <code>global-error</code> też zwrócił 200), więc nie używaj statusu do
      wykrywania takich błędów.
    </li>
    <li>
      <strong>global-error zastępuje wszystko.</strong> Gdy się wyrenderował,
      zawartość root layoutu zniknęła. Nie ładuje twoich globalnych stylów, więc
      niech będzie samowystarczalny.
    </li>
    <li>
      <strong>Raportowanie to osobna praca.</strong> Boundary tylko pokazuje
      fallback. Prawdziwe boundary powinny wysyłać błąd do monitoringu w
      efekcie; <code>global-error.tsx</code> tego projektu to robi. Boundary w
      demo celowo nie, bo ich błędy są rzucane ręcznie.
    </li>
    <li>
      <strong>Retry może znów zawieść.</strong> <code>retry()</code> renderuje
      ten sam kod na tych samych danych; przy trwałym błędzie znów pokaże
      fallback.
    </li>
    <li>
      <strong>Istnieje odzyskiwanie na poziomie komponentu.</strong>{" "}
      <code>catchError</code> (z <code>next/error</code>) opakowuje dowolną część
      drzewa w boundary, który rozumie <code>redirect()</code> i{" "}
      <code>notFound()</code>.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak działa error.tsx i dlaczego musi być Client Component?",
    answer: (
      <p>
        Opakowuje segment w error boundary Reacta, który jest mechanizmem
        po stronie klienta, więc potrzebuje <code>&quot;use client&quot;</code>.
        Gdy render w segmencie rzuci, boundary pokazuje twój komponent z błędem i
        funkcją ponowienia.
      </p>
    ),
  },
  {
    question: "Czy error.tsx łapie błędy we własnym layoucie?",
    answer: (
      <p>
        Nie. Boundary opakowuje stronę i zagnieżdżone layouty pod nim, a nie
        layout ani template tego samego segmentu. Łapie go boundary segmentu
        nadrzędnego, a root layout potrzebuje <code>global-error.tsx</code>.
      </p>
    ),
  },
  {
    question: "Co widzi użytkownik przy błędzie Server Component na produkcji?",
    answer: (
      <p>
        Ogólny komunikat plus <code>digest</code>, nigdy prawdziwy tekst. Pełny
        błąd jest w logach serwera pod tym samym digestem, co pozwala powiązać
        zgłoszenie z przyczyną bez wycieku szczegółów.
      </p>
    ),
  },
  {
    question: "Czego error boundary nie łapią?",
    answer: (
      <p>
        Błędów w handlerach zdarzeń, kodu asynchronicznego poza renderem i
        błędów w samym boundary. Obsłuż je przez <code>try/catch</code> i stan,
        a nieoczekiwane raportuj.
      </p>
    ),
  },
  {
    question: "retry() czy reset()?",
    answer: (
      <p>
        <code>retry()</code> pobiera dane i renderuje segment od nowa w
        tranzycji, co naprawia chwilowe awarie. <code>reset()</code> czyści stan
        błędu i renderuje dzieci bez ponownego pobierania.
      </p>
    ),
  },
  {
    question: "Czym jest global-error.tsx i czym różni się od error.tsx?",
    answer: (
      <p>
        Obsługuje błędy w root layoucie, zastępuje go, więc musi zdefiniować
        własne <code>&lt;html&gt;</code> i <code>&lt;body&gt;</code>. To
        boundary ostatniej szansy i nie dostaje twoich globalnych stylów.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Error boundaries",
  summary: "error.tsx a global-error.tsx.",
  basics,
  edgeCases,
  interviewQuestions,
};
