import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/rendering/streaming/demo";

const basics = (
  <>
    <p>
      Streaming pozwala serwerowi wysyłać HTML po kawałku. Next.js wysyła
      powłokę od razu, z fallbackiem <code>&lt;Suspense&gt;</code> wszędzie tam,
      gdzie część nie jest gotowa, a potem streamuje każdą część, gdy się
      rozwiąże. Dwa sposoby umieszczenia granicy:
    </p>
    <ul>
      <li>
        <code>loading.tsx</code> opakowuje stronę i zagnieżdżone layouty jego
        segmentu w granicę z tym fallbackiem (zobacz{" "}
        <LocalizedLink href="/fundamentals/file-conventions">konwencje plików</LocalizedLink>).
      </li>
      <li>
        <code>&lt;Suspense&gt;</code> we własnym drzewie daje drobniejszą
        kontrolę: jedna granica na każdą wolną część.
      </li>
    </ul>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> ma dwie sekcje. Przy jednej granicy na
      blok trzy bloki pojawiają się niezależnie. Zmierzone na buildzie
      produkcyjnym: powłoka dotarła po około 26 ms, a bloki po około 0,34 s,
      1,24 s i 2,44 s. Przy jednej wspólnej granicy trzy bloki pojawiają się
      razem po najwolniejszym, a cała odpowiedź trwała około 2,4 s, a nie sumę
      opóźnień, bo bloki renderują się równolegle. Panel „Pod maską” czyta
      odpowiedź jako strumień i pokazuje moment dotarcia każdego fragmentu.
    </p>
    <CodeBlock title="app/dashboard/page.tsx" code={`
import { Suspense } from "react";

// Powłoka jest wysyłana pierwsza; każda granica dopływa, gdy jej dane są gotowe.
export default function Page() {
  return (
    <>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Ładowanie statystyk…</p>}>
        <Stats />      {/* wolny: nie blokuje reszty */}
      </Suspense>
      <Suspense fallback={<p>Ładowanie feedu…</p>}>
        <Feed />       {/* niezależny: pojawia się, gdy jest gotowy */}
      </Suspense>
    </>
  );
}

// app/dashboard/loading.tsx opakowuje całą stronę granicą Suspense:
export default function Loading() {
  return <p>Ładowanie dashboardu…</p>;
}
`} />
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Kod statusu został już wysłany.</strong> Gdy powłoka zaczyna
      płynąć, odpowiedź ma status <code>200</code>. <code>notFound()</code> lub{" "}
      <code>redirect()</code> wewnątrz streamowanej treści tego nie zmieni; dla
      404 Next.js dodaje zamiast tego do HTML{" "}
      <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;&gt;</code>.
    </li>
    <li>
      <strong>Sprawdź, zanim zawiesisz.</strong> Aby dostać prawdziwy status
      404, zweryfikuj istnienie zasobu przed jakąkolwiek granicą Suspense i
      przed każdym <code>await</code>, który może zawiesić, albo przepisz
      brakujące slugi w Proxy.
    </li>
    <li>
      <strong>Wspólna granica czeka na najwolniejsze dziecko.</strong> Dzieci w
      jednej granicy renderują się równolegle, ale granica odsłania się razem.
      Podziel granice, by odsłaniać niezależnie.
    </li>
    <li>
      <strong>Zbyt wysoka granica pokazuje za mało.</strong> Opakowanie całej
      strony zostawia powłokę jako fallback. Stawiaj granice tylko wokół wolnych
      części, by reszta została natychmiastowa.
    </li>
    <li>
      <strong>Dane runtime wymagają granicy.</strong> Przy Cache Components
      odczyt <code>cookies()</code>, <code>headers()</code> lub nie-cache&apos;owanych
      danych poza <code>&lt;Suspense&gt;</code> wywala build, więc streaming to
      też sposób, by włączyć część do renderowania per żądanie.
    </li>
    <li>
      <strong>Niektóre przeglądarki buforują małe odpowiedzi.</strong> Odpowiedź
      poniżej około 1024 bajtów może w niektórych przeglądarkach nie wyglądać na
      streamowaną; prawdziwe strony są zwykle większe.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym jest streaming SSR i dlaczego pomaga?",
    answer: (
      <p>
        Serwer wysyła stronę we fragmentach: najpierw powłokę, potem każdą wolną
        część, gdy się skończy. Użytkownicy widzą treść wcześniej (lepsza
        postrzegana wydajność i TTFB), a wolne dane nie blokują już całej reszty.
      </p>
    ),
  },
  {
    question: "Jak loading.tsx i Suspense się do siebie mają?",
    answer: (
      <p>
        <code>loading.tsx</code> to granica Suspense, którą Next.js stawia wokół
        strony i zagnieżdżonych layoutów tego segmentu, z Twoim plikiem jako
        fallbackiem. Ręczny <code>&lt;Suspense&gt;</code> robi to samo dla
        dowolnej części drzewa komponentów.
      </p>
    ),
  },
  {
    question: "Dlaczego streamowana strona not-found zwraca 200?",
    answer: (
      <p>
        Status HTTP jest wysyłany z nagłówkami, które idą przed streamowanym
        ciałem. Gdy streaming ruszy, nie można go zmienić, więc Next.js oznacza
        stronę <code>noindex</code> w HTML. Jeśli potrzebujesz statusu 404,
        sprawdź istnienie zasobu przed rozpoczęciem streamingu.
      </p>
    ),
  },
  {
    question: "Czym różni się jedna granica Suspense od kilku?",
    answer: (
      <p>
        Przy kilku każda część pojawia się, gdy jest gotowa. Przy jednej wokół
        kilku dzieci renderują się równolegle, ale odsłaniają razem, gdy
        najwolniejsze się skończy. Demo mierzy oba przypadki.
      </p>
    ),
  },
  {
    question: "Czy streaming szkodzi SEO?",
    answer: (
      <p>
        Nie. To renderowanie po stronie serwera, więc crawlery dostają HTML. Dla
        botów czytających tylko statyczny HTML Next.js rozwiązuje{" "}
        <code>generateMetadata</code> przed streamingiem, by metadane trafiły do{" "}
        <code>&lt;head&gt;</code>.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Streaming",
  summary: "loading.tsx i granice Suspense w drzewie komponentów serwerowych.",
  basics,
  edgeCases,
  interviewQuestions,
};
