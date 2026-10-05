import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/data/fetch-extensions/demo";

export const basics = (
  <>
    <p>
      Next.js rozszerza webowy <code>fetch</code> o opcje sterujące cache.
      Cache jest <strong>opt-in</strong>: zwykłe <code>fetch(url)</code> nie
      jest cache&apos;owane.
    </p>
    <ul>
      <li>
        <code>cache: &quot;force-cache&quot;</code> zapisuje odpowiedź i
        używa jej ponownie. <code>cache: &quot;no-store&quot;</code> zawsze
        pobiera od nowa.
      </li>
      <li>
        <code>next.revalidate: sekundy</code> cache&apos;uje odpowiedź i
        odświeża ją w tle po tym czasie (stale-while-revalidate).
      </li>
      <li>
        <code>next.tags: [...]</code> oznacza wpis etykietą, by{" "}
        <code>revalidateTag</code> mógł go unieważnić na żądanie. Etykietuje;
        sam nie włącza cache.
      </li>
    </ul>
    <p>
      Osobno: identyczne żądania <code>GET</code> (ten sam URL i opcje) w jednym
      przebiegu renderowania są <strong>memoizowane</strong>: wykonują się raz
      i dzielą wynik.
    </p>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> wywołuje własne API
      aplikacji, które liczy, ile razy naprawdę się wykonało. Przeładuj i
      obserwuj, które wiersze rosną (bez cache), a które stoją w miejscu (z
      cache). Zaobserwowane tutaj: <code>default</code>, <code>no-store</code>{" "}
      i same tagi uderzają w API za każdym razem; <code>force-cache</code>,{" "}
      <code>next.revalidate</code> i <code>force-cache</code> z tagami są
      serwowane z cache; ten sam URL pobrany dwa razy w jednym renderze daje
      jedno trafienie; a <code>revalidateTag</code> odświeża tylko wpis z
      tagiem.
    </p>
    <p>
      <em>Kontrast (starsze wersje):</em> do Next.js 14 fetche <code>GET</code>{" "}
      były domyślnie cache&apos;owane. W nowym kodzie z Cache Components
      zalecanym sposobem cache&apos;owania danych jest{" "}
      <code>&quot;use cache&quot;</code> (zob. temat o migracji).
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Same tagi nie cache&apos;ują.</strong>{" "}
      <code>next: {"{ tags }"}</code> bez <code>force-cache</code> ani{" "}
      <code>revalidate</code> nadal uderza w sieć przy każdym żądaniu, więc{" "}
      <code>revalidateTag</code> nie ma czego unieważniać. Połącz je.
    </li>
    <li>
      <strong>Kluczem cache jest całe żądanie.</strong> URL, metoda,
      nagłówki i body razem: dwa żądania różniące się czymkolwiek z tego są
      cache&apos;owane osobno (demo daje każdemu wierszowi własny query
      string).
    </li>
    <li>
      <strong>Fetche bez cache wymagają Suspense.</strong> Przy Cache
      Components żądanie bez cache liczy się jako dane runtime. Poza{" "}
      <code>&lt;Suspense&gt;</code> build się nie powiedzie, a błąd wymienia{" "}
      <code>fetch(...)</code> obok <code>cookies()</code> i{" "}
      <code>headers()</code>.
    </li>
    <li>
      <strong>Memoizacja działa na jeden render, nie trwale.</strong> Obejmuje
      Server Components, layouty, strony i funkcje metadanych w jednym
      przebiegu. Nie działa w Route Handlerach, a przekazanie sygnału{" "}
      <code>AbortController</code> wyłącza z niej żądanie.
    </li>
    <li>
      <strong>revalidate to stale-while-revalidate.</strong> Po upływie
      interwału następne żądanie nadal dostaje starą odpowiedź i wyzwala
      odświeżenie. <code>revalidateTag(tag, &quot;max&quot;)</code> zachowuje
      się tak samo: pierwsze żądanie po nim dostaje nieaktualną wersję.
    </li>
    <li>
      <strong>Sprzeczne opcje są ignorowane.</strong>{" "}
      <code>{"{ revalidate: 3600, cache: \"no-store\" }"}</code> jest
      niedozwolone; obie opcje są pomijane, a development wypisuje
      ostrzeżenie.
    </li>
    <li>
      <strong>Nigdy nie buduj URL z żądania.</strong> Demo czyta własny origin
      z konfiguracji, a nie z nagłówka <code>Host</code>, bo host sterowany
      przez wołającego pozwoliłby każdemu kierować wychodzący fetch serwera
      (SSRF). Odpowiedź też parsuj schematem.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czy fetch jest domyślnie cache'owany w App Routerze?",
    answer: (
      <p>
        W obecnych wersjach nie: cache jest opt-in. Użyj{" "}
        <code>cache: &quot;force-cache&quot;</code> lub{" "}
        <code>next.revalidate</code>, by cache&apos;ować. (Do Next.js 14 fetche
        GET były domyślnie cache&apos;owane.)
      </p>
    ),
  },
  {
    question: "Co robią next.revalidate i next.tags?",
    answer: (
      <p>
        <code>next.revalidate</code> cache&apos;uje odpowiedź i odświeża ją w
        tle po N sekundach. <code>next.tags</code> oznacza wpis w cache
        etykietą, by <code>revalidateTag</code> mógł go unieważnić na żądanie.
        Same tagi nie włączają cache.
      </p>
    ),
  },
  {
    question: "Czym jest memoizacja żądań i czym różni się od Data Cache?",
    answer: (
      <p>
        Memoizacja deduplikuje identyczne żądania GET w jednym przebiegu
        renderowania, więc każde wykonuje się raz; działa per żądanie i w
        pamięci. Data Cache trwale przechowuje odpowiedzi między żądaniami i
        jest sterowany przez <code>cache</code> i <code>next.revalidate</code>.
        To osobne warstwy (zob. temat o warstwach cache).
      </p>
    ),
  },
  {
    question: "Co wchodzi w klucz cache fetcha?",
    answer: (
      <p>
        URL, metoda, nagłówki i body. Żądanie różniące się którymkolwiek z nich
        to inny wpis w cache.
      </p>
    ),
  },
  {
    question: "Jak unieważnić na żądanie jeden cache'owany fetch?",
    answer: (
      <p>
        Oznacz go tagiem (<code>next: {"{ tags: [\"posts\"] }"}</code>) razem z{" "}
        <code>force-cache</code>, a potem wywołaj{" "}
        <code>revalidateTag(&quot;posts&quot;, &quot;max&quot;)</code> z Server
        Action lub Route Handlera. Wpisy bez tagu zostają w cache.
      </p>
    ),
  },
  {
    question: "Dlaczego fetch bez cache musi być w Suspense przy Cache Components?",
    answer: (
      <p>
        Bo nie może się zakończyć podczas prerenderu, więc zablokowałby
        statyczną powłokę. Granica pozwala Next.js prerenderować powłokę z
        fallbackiem i strumieniować wynik fetcha per żądanie.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Rozszerzenia fetch()",
  summary: "cache, next.revalidate i next.tags.",
  basics,
  edgeCases,
  interviewQuestions,
};
