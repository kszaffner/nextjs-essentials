import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoHref = "/data/parallel-vs-sequential/demo";

export const basics = (
  <>
    <p>
      <strong>Waterfall</strong> (kaskada) to łańcuch żądań, w którym każde
      startuje dopiero po zakończeniu poprzedniego. Gdy żądania są niezależne,
      to marnuje czas: całość trwa <em>sumę</em> opóźnień zamiast{" "}
      <em>najdłuższego</em> z nich. Na serwerze łatwo go stworzyć, nie
      zauważając.
    </p>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> symuluje żądania
      trwające po 600 ms i mierzy prawdziwy czas na serwerze:
    </p>
    <ul>
      <li>
        <strong>Sekwencyjne awaity</strong> w jednym komponencie: trzy żądania
        trwają około <strong>1800 ms</strong>.
      </li>
      <li>
        <strong><code>Promise.all</code></strong>: te same trzy trwają około{" "}
        <strong>600 ms</strong>.
      </li>
      <li>
        <strong>Zagnieżdżone komponenty</strong>, z których każdy pobiera dane,
        zanim wyrenderuje następny: około <strong>1800 ms</strong>, kaskada
        ukryta w drzewie.
      </li>
      <li>
        <strong>Komponenty rodzeństwa</strong>, z których każdy pobiera dane za
        własną granicą Suspense: każdy kończy się po około{" "}
        <strong>600 ms</strong>.
      </li>
      <li>
        <strong>Promise przekazany do Client Component</strong> i czytany przez{" "}
        <code>use()</code>: serwer go startuje i na nim nie blokuje.
      </li>
    </ul>
    <p>
      Zasada: startuj niezależne żądania razem, a łańcuchuj tylko te, które
      naprawdę zależą od wyniku poprzednich.
    </p>
    <pre>
      <code>{`// Start wcześnie, await później (wzorzec preload)
const itemPromise = getItem(id);       // startuje teraz
const user = await getUser();          // działa w międzyczasie
const item = await itemPromise;`}</code>
    </pre>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Komponenty mogą ukryć kaskadę.</strong> Komponent potomny może
      rozpocząć własny fetch dopiero, gdy rodzic go wyrenderuje, a rodzic robi
      to po własnym <code>await</code>. Przenieś niezależne fetche do wspólnego
      rodzica i startuj je razem albo zrób z komponentów rodzeństwo.
    </li>
    <li>
      <strong>Zależne żądania to nie błąd.</strong> Jeśli drugie żądanie
      potrzebuje wyniku pierwszego (id użytkownika, by pobrać jego zamówienia),
      muszą być sekwencyjne. Zmniejsz zależność (przekaż id wcześniej, niech
      backend zrobi złączenie), zamiast wymuszać równoległość.
    </li>
    <li>
      <strong>
        <code>Promise.all</code> odrzuca się przy pierwszym błędzie.
      </strong>{" "}
      Jedno nieudane żądanie odrzuca całą grupę. Użyj{" "}
      <code>Promise.allSettled</code>, gdy wyniki częściowe są akceptowalne.
    </li>
    <li>
      <strong>Równolegle nie znaczy mniej żądań.</strong> Dwa komponenty
      rodzeństwa pytające o te same dane oba by je pobrały. Identyczne fetche{" "}
      <code>GET</code> są memoizowane w obrębie renderu, a inne loadery można
      opakować w <code>React.cache</code>, więc praca wykona się raz.
    </li>
    <li>
      <strong>Granice decydują, kiedy części się pojawią.</strong> Rodzeństwo w
      osobnych granicach <code>&lt;Suspense&gt;</code> odsłania się w miarę
      rozwiązywania; rodzeństwo w jednej granicy odsłania się razem, gdy
      skończy najwolniejsze (zob. temat o streamingu).
    </li>
    <li>
      <strong>
        <code>use()</code> potrzebuje promise utworzonego na serwerze.
      </strong>{" "}
      Promise utworzony podczas renderu Client Component jest tworzony od nowa
      przy każdym renderze. Utwórz go w Server Component, przekaż w dół i
      opakuj czytelnika w <code>&lt;Suspense&gt;</code>.
    </li>
    <li>
      <strong>Przy Cache Components żądania bez cache potrzebują granicy.</strong>{" "}
      Sekcje demo działają po <code>connection()</code> wewnątrz Suspense.
      Żądania z cache mogą natomiast zakończyć się w trakcie buildu i zniknąć w
      statycznej powłoce.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym jest problem waterfall?",
    answer: (
      <p>
        Niezależne żądania wykonywane jedno po drugim, więc całkowity czas to
        suma opóźnień zamiast najdłuższego. W demo trzy żądania po 600 ms trwają
        około 1800 ms sekwencyjnie i około 600 ms równolegle.
      </p>
    ),
  },
  {
    question: "Jak pobierać dane równolegle w Server Component?",
    answer: (
      <p>
        Wystartuj żądania razem i poczekaj na nie jako grupę przez{" "}
        <code>Promise.all</code> albo rozdziel je na komponenty rodzeństwa,
        z których każdy pobiera własne dane (najlepiej za własną granicą
        Suspense). Możesz też wystartować promise wcześnie i czekać na niego
        później.
      </p>
    ),
  },
  {
    question: "Jak zagnieżdżone komponenty powodują waterfall?",
    answer: (
      <p>
        Komponent potomny renderuje się dopiero, gdy rodzic skończy swój{" "}
        <code>await</code>, więc jeśli każdy poziom pobiera dane przed
        wyrenderowaniem następnego, żądania się łańcuchują. Trzy zagnieżdżone
        poziomy w demo trwają około 1800 ms, choć żądania są niezależne.
      </p>
    ),
  },
  {
    question: "Promise.all czy Promise.allSettled?",
    answer: (
      <p>
        <code>Promise.all</code> kończy się błędem, gdy tylko jeden promise
        zostanie odrzucony, co jest właściwe, gdy potrzebujesz każdego wyniku.{" "}
        <code>Promise.allSettled</code> zwraca każdy rezultat, co jest właściwe,
        gdy strona może się wyrenderować z częściowymi danymi.
      </p>
    ),
  },
  {
    question: "Jak use() pomaga w pobieraniu danych?",
    answer: (
      <p>
        Server Component może wystartować żądanie i przekazać promise do Client
        Component, który czyta go przez <code>use()</code> za Suspense. Serwer
        nie blokuje się na danych, a komponent kliencki zawiesza się, dopóki się
        nie rozwiążą.
      </p>
    ),
  },
  {
    question: "Kiedy pobieranie sekwencyjne jest poprawne?",
    answer: (
      <p>
        Gdy żądanie zależy od wyniku poprzedniego. Wtedy łańcuch jest
        nieodłączny; przyspieszyć go można, usuwając zależność lub przenosząc
        złączenie do backendu.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Pobieranie równoległe a sekwencyjne",
  summary: "Problem waterfall i jak go uniknąć.",
  basics,
  edgeCases,
  interviewQuestions,
};
