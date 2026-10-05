import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/rendering/ppr/demo";

const basics = (
  <>
    <p>
      Partial Prerendering to domyślny model renderowania z Cache Components:
      każda trasa dzieli się na <strong>statyczną powłokę</strong>{" "}
      prerenderowaną w czasie builda i <strong>dynamiczne dziury</strong>,
      które streamują się przy każdym żądaniu. Nie ma flagi per trasa; to, czego
      używa część, decyduje, gdzie trafi:
    </p>
    <ul>
      <li>
        <strong>Statyczne:</strong> wartości przewidywalne, w powłoce.
      </li>
      <li>
        <strong>Z cache:</strong> <code>&quot;use cache&quot;</code> z{" "}
        <code>cacheLife</code> wystarczająco długim, by prerenderować, w
        powłoce.
      </li>
      <li>
        <strong>Dynamiczne:</strong> dane runtime, nie-cache&apos;owane I/O lub
        cache o bardzo krótkim czasie życia, za <code>&lt;Suspense&gt;</code>.
      </li>
    </ul>
    <table>
      <thead>
        <tr>
          <th scope="col">Profil</th>
          <th scope="col">stale</th>
          <th scope="col">revalidate</th>
          <th scope="col">expire</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>seconds</code></td><td>30 s</td><td>1 s</td><td>1 min</td></tr>
        <tr><td><code>minutes</code></td><td>5 min</td><td>1 min</td><td>1 godz.</td></tr>
        <tr><td><code>hours</code></td><td>5 min</td><td>1 godz.</td><td>1 dzień</td></tr>
        <tr><td><code>days</code></td><td>5 min</td><td>1 dzień</td><td>1 tydzień</td></tr>
        <tr><td><code>max</code></td><td>5 min</td><td>30 dni</td><td>1 rok</td></tr>
      </tbody>
    </table>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> pokazuje wszystkie cztery rodzaje na
      jednej stronie. Po jej zażądaniu pierwszy streamowany fragment zawiera
      już część statyczną, godzinowy znacznik czasu z cache (z builda, taki sam
      przy każdym żądaniu) i dwa fallbacki Suspense; część czasu żądania zmienia
      się przy każdym żądaniu, a część z cache sekundowym odświeża się mniej
      więcej co sekundę. Wyjście builda oznacza trasę symbolem <code>◐</code>.
      Panel „Pod maską” pokazuje to jako strumień: powłoka w pierwszym
      fragmencie, dziury w kolejnych.
    </p>
    <CodeBlock title="app/page.tsx" code={`
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { connection } from "next/server";

export default function Page() {
  return (
    <>
      <h1>Statyczna powłoka</h1>                    {/* prerenderowana w buildzie */}
      <Cached />                                    {/* z cache: część powłoki */}
      <Suspense fallback={<p>Ładowanie…</p>}>
        <PerRequest />                              {/* strumieniowane per żądanie */}
      </Suspense>
    </>
  );
}

async function Cached() {
  "use cache";
  cacheLife("hours");
  return <p>{new Date().toISOString()}</p>;
}

async function PerRequest() {
  await connection(); // rezygnuje z prerenderu: działa przy każdym żądaniu
  return <p>{new Date().toISOString()}</p>;
}
`} />
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Kod z cache nie może czytać danych runtime.</strong> Funkcja lub
      komponent z <code>&quot;use cache&quot;</code> nie może wywołać{" "}
      <code>cookies()</code>, <code>headers()</code> ani czytać{" "}
      <code>searchParams</code> (ograniczenie wynika ze stosu wywołań). Czytaj
      je na zewnątrz i przekaż wartości jako argumenty, które stają się też
      częścią klucza cache.
    </li>
    <li>
      <strong>Czas życia cache decyduje o członkostwie w powłoce.</strong>{" "}
      Krótki <code>cacheLife</code> (<code>seconds</code> ma{" "}
      <code>expire</code> jedną minutę) jest wykluczany z prerenderu i staje się
      dziurą, a <code>hours</code> zostaje w powłoce. Tylko dziura potrzebuje
      granicy Suspense.
    </li>
    <li>
      <strong>Wartości z cache w powłoce mogą być stare.</strong> Godzinowy
      znacznik czasu w demie pochodzi z builda, a nie z Twojego żądania.
      Otaguj go przez <code>cacheTag</code> i wywołaj <code>revalidateTag</code>,
      by odświeżyć na żądanie.
    </li>
    <li>
      <strong>Wartości niestabilne nadal wywalają build.</strong>{" "}
      <code>new Date()</code> lub <code>Math.random()</code> poza cache albo
      granicą to błąd (&quot;unstable value … while prerendering&quot;); opakuj w{" "}
      <code>&quot;use cache&quot;</code>, by współdzielić jedną wartość, albo
      odczytaj po <code>connection()</code> wewnątrz Suspense.
    </li>
    <li>
      <strong>Łącz każdą dyrektywę z cacheLife.</strong> Bez niego działa
      niejawny profil <code>default</code> (15 minut do rewalidacji, nigdy nie
      wygasa), co może nie być zamierzone.
    </li>
    <li>
      <strong>Dziura kosztuje render na serwerze przy każdym żądaniu.</strong>{" "}
      Powłoka jest tania i natychmiastowa; dziury nie. Trzymaj dziury małe i
      głęboko.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym jest Partial Prerendering?",
    answer: (
      <p>
        Renderowaniem trasy jako statycznej powłoki, prerenderowanej w czasie
        builda i możliwej do serwowania z CDN, plus dynamicznych dziur
        streamowanych przy każdym żądaniu za granicami Suspense. Z Cache
        Components jest domyślne; nie włącza się go per trasa.
      </p>
    ),
  },
  {
    question: "Co trafia do statycznej powłoki, a co staje się dziurą?",
    answer: (
      <p>
        Do powłoki trafiają wartości przewidywalne i wyniki{" "}
        <code>&quot;use cache&quot;</code> z wystarczająco długim czasem życia.
        Dane runtime (<code>cookies()</code>, <code>headers()</code>,{" "}
        <code>searchParams</code>), nie-cache&apos;owane fetche,{" "}
        <code>connection()</code> i cache o bardzo krótkim czasie życia to
        dziury i potrzebują Suspense.
      </p>
    ),
  },
  {
    question: "Co znaczą stale, revalidate i expire w cacheLife?",
    answer: (
      <p>
        <code>stale</code>: jak długo klient może używać wyniku bez pytania
        serwera. <code>revalidate</code>: po tym czasie następne żądanie dostaje
        stary wynik i wyzwala odświeżenie w tle. <code>expire</code>: po tym
        czasie bez ruchu następne żądanie czeka na świeżą treść.
      </p>
    ),
  },
  {
    question: "Dlaczego funkcja use cache nie może czytać cookies()?",
    answer: (
      <p>
        Wynik z cache jest współdzielony między żądaniami, więc nie może
        zależeć od pojedynczego żądania. Odczytaj cookie na zewnątrz, przekaż
        wartość jako argument (wchodzi do klucza cache) albo użyj innej
        strategii, np. dziury per żądanie.
      </p>
    ),
  },
  {
    question: "Jak odświeżyć zawartość z cache na żądanie?",
    answer: (
      <p>
        Otaguj ją przez <code>cacheTag</code> wewnątrz funkcji z cache i wywołaj{" "}
        <code>revalidateTag(tag, &quot;max&quot;)</code> z Server Action lub
        Route Handlera. Następne żądanie dostaje nieaktualną treść, gdy ta się
        regeneruje.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Partial Prerendering",
  summary: '"use cache", cacheLife i cacheTag ze statyczną powłoką.',
  basics,
  edgeCases,
  interviewQuestions,
};
