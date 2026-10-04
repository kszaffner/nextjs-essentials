import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoBase = "/fundamentals/intercepting-routes/demo";

const basics = (
  <>
    <p>
      Trasa przechwytująca ładuje inną trasę <em>wewnątrz bieżącego
      layoutu</em>, podczas gdy URL w przeglądarce pokazuje trasę docelową.
      Klasyczny przypadek to zdjęcie w galerii: kliknięcie otwiera modal nad
      listą pod adresem <code>/photo/1</code>, ale wejście na ten URL
      bezpośrednio renderuje pełną stronę.
    </p>
    <p>Prefiks folderu mówi, o ile poziomów trasy wyżej szukać celu:</p>
    <ul>
      <li>
        <code>(.)</code> ten sam poziom, <code>(..)</code> poziom wyżej,{" "}
        <code>(..)(..)</code> dwa poziomy wyżej, <code>(...)</code> od
        głównego katalogu <code>app</code>.
      </li>
      <li>
        Poziomy to <strong>segmenty trasy</strong>, a nie foldery na dysku:
        foldery <code>@slot</code> i <code>(group)</code> się nie liczą.
      </li>
    </ul>
    <p>
      Demo łączy to z trasą równoległą:{" "}
      <code>demo/@modal/(.)photo/[id]/page.tsx</code> przechwytuje{" "}
      <code>demo/photo/[id]</code>, a layout renderuje slot <code>modal</code>{" "}
      obok <code>children</code>. Wypróbuj{" "}
      <LocalizedLink href={demoBase}>galerię</LocalizedLink>.
    </p>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Przechwycenie działa tylko przy miękkiej nawigacji.</strong>{" "}
      Przeładowanie, udostępniony link czy nowa karta to twarda nawigacja,
      więc renderuje się prawdziwa strona <code>photo/[id]</code>. Obie
      strony muszą istnieć i działać.
    </li>
    <li>
      <strong>Slot potrzebuje <code>default.tsx</code> zwracającego null.</strong>{" "}
      Bez niego twarda nawigacja na dowolny URL, w którym <code>@modal</code>{" "}
      nic nie pasuje, renderuje 404.
    </li>
    <li>
      <strong>Zamykaj przez <code>router.back()</code>, nie linkiem do listy.</strong>{" "}
      Cofnięcie utrzymuje spójną historię: przycisk wstecz zamyka modal, a
      przycisk dalej otwiera go ponownie.
    </li>
    <li>
      <strong><code>(..)</code> liczy segmenty, nie foldery.</strong> Umieszczenie
      folderu przechwytującego w <code>@modal</code> lub{" "}
      <code>(group)</code> nie zmienia liczby <code>..</code>.
    </li>
    <li>
      <strong>Parametry dynamiczne podlegają tym samym zasadom co w każdej
      trasie.</strong> Demo wymienia id w <code>generateStaticParams</code>{" "}
      zarówno dla modala, jak i pełnej strony; bez tego params są danymi
      runtime przy Cache Components.
    </li>
    <li>
      <strong>Treść modala może zostać Server Componentem.</strong> Część
      wyłącznie kliencką (<code>dialog</code> i <code>useRouter</code>)
      trzymaj w małym wrapperze i przekaż treść jako <code>children</code>,
      jak w demie.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jaki problem rozwiązują trasy przechwytujące?",
    answer: (
      <p>
        Pokazują trasę w bieżącym kontekście (modal nad listą), zachowując
        prawdziwy, możliwy do udostępnienia URL. Bezpośrednie wejście lub
        odświeżenie renderuje pełną stronę; nawigacja po stronie klienta
        renderuje wersję przechwyconą.
      </p>
    ),
  },
  {
    question: "Czym różnią się (.), (..), (..)(..) i (...)?",
    answer: (
      <p>
        Wybierają, który poziom <em>drzewa tras</em> dopasować, podobnie jak{" "}
        <code>./</code> i <code>../</code>: ten sam poziom, jeden wyżej, dwa
        wyżej albo korzeń <code>app</code>. Pomijają foldery{" "}
        <code>@slot</code> i <code>(group)</code>, bo nie są segmentami.
      </p>
    ),
  },
  {
    question: "Dlaczego trasy przechwytujące zwykle łączy się z trasami równoległymi?",
    answer: (
      <p>
        Przechwycona strona potrzebuje miejsca, w którym wyrenderuje się bez
        zastępowania bieżącej strony. Zapewnia to slot <code>@modal</code>:
        layout renderuje go obok <code>children</code>, więc galeria pozostaje
        zamontowana pod spodem.
      </p>
    ),
  },
  {
    question: "Co się dzieje, gdy użytkownik odświeży stronę przy otwartym modalu?",
    answer: (
      <p>
        Odświeżenie to twarda nawigacja, więc nie ma przechwycenia:
        renderuje się w całości dedykowana strona tego URL, a slot wraca do
        swojego <code>default.tsx</code>.
      </p>
    ),
  },
  {
    question: "Jak powinien zamykać się modal i dlaczego?",
    answer: (
      <p>
        Przez <code>router.back()</code>. Modal został otwarty nawigacją, więc
        cofnięcie zdejmuje ten wpis historii: URL wraca do listy, przycisk
        wstecz działa poprawnie, a dalej otwiera modal ponownie. Zwykły link
        do listy dodałby nowy wpis w historii.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Trasy przechwytujące",
  summary: "Pokazanie innej trasy w bieżącym kontekście za pomocą (.)folder.",
  basics,
  edgeCases,
  interviewQuestions,
};
