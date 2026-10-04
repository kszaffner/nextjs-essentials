import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoBase = "/fundamentals/parallel-routes/demo";

const basics = (
  <>
    <p>
      Folder zaczynający się od <code>@</code> to <strong>slot</strong>. Nie
      jest segmentem URL; zamiast tego layout nadrzędny dostaje stronę slotu
      jako prop o tej samej nazwie, obok niejawnego slotu{" "}
      <code>children</code>. Layout decyduje, gdzie każdy slot się renderuje,
      więc jeden URL może pokazywać kilka niezależnych stron naraz.
    </p>
    <p>W demie layout ma trzy sloty:</p>
    <ul>
      <li>
        <code>children</code> z <code>demo/page.tsx</code>,
      </li>
      <li>
        <code>team</code> z <code>demo/@team/page.tsx</code>,
      </li>
      <li>
        <code>analytics</code> z <code>demo/@analytics/page.tsx</code>, który
        jest celowo wolny i ma własny <code>loading.tsx</code>, więc
        doczytuje się osobno, gdy pozostałe są już widoczne.
      </li>
    </ul>
    <p>
      Każdy slot ma własny stan nawigacji, interfejs ładowania i granicę
      błędów. Tylko <code>@team</code> ma stronę <code>settings</code>: otwórz{" "}
      <LocalizedLink href={`${demoBase}/settings`}>/demo/settings</LocalizedLink> miękką
      nawigacją, a zmieni się tylko panel zespołu, pozostałe dwa zachowają to,
      co pokazywały. Potem przeładuj stronę i porównaj.
    </p>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Miękka i twarda nawigacja zachowują się inaczej.</strong> Przy
      nawigacji po stronie klienta slot bez pasującej strony nadal pokazuje
      swoją bieżącą treść, mimo że nie pasuje do URL. Po pełnym załadowaniu
      Next.js nie odtworzy tego stanu, więc renderuje <code>default.tsx</code>{" "}
      slotu albo <strong>404</strong>, jeśli go nie ma.
    </li>
    <li>
      <strong>
        <code>children</code> też potrzebuje <code>default.tsx</code>.
      </strong>{" "}
      To niejawny slot, więc przeładowanie na <code>/demo/settings</code>{" "}
      (gdzie pasuje tylko <code>@team</code>) renderuje dla niego{" "}
      <code>demo/default.tsx</code>, a bez niego 404.
    </li>
    <li>
      <strong>Sloty nie są segmentami URL.</strong> <code>@team</code> nigdy
      nie pojawia się w URL, a konwencje tras przechwytujących, takie jak{" "}
      <code>(..)</code>, pomijają foldery <code>@slot</code> przy liczeniu
      poziomów.
    </li>
    <li>
      <strong>Nazwa slotu to nazwa propa.</strong> Zmień nazwę folderu, a
      musisz zmienić nazwę destrukturyzowanego propa w layoucie; niezgodność
      nic nie wyrenderuje w tym slocie.
    </li>
    <li>
      <strong>Sloty streamują się i zawodzą niezależnie.</strong> Wolny lub
      rzucający błąd slot pokazuje własny <code>loading.tsx</code> albo{" "}
      <code>error.tsx</code>, nie przewracając slotów obok.
    </li>
    <li>
      <strong>Zamknięcie slotu warunkowego wymaga pasującej trasy.</strong>{" "}
      Slot, który przestał pasować, zostaje widoczny przy miękkiej nawigacji,
      więc by go „schować”, potrzebna jest trasa (często catch-all zwracający{" "}
      <code>null</code>), która pasuje.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym jest trasa równoległa i jak używa jej layout?",
    answer: (
      <p>
        Trasa równoległa to folder <code>@slot</code>. Nie zmienia URL. Layout
        nadrzędny dostaje stronę każdego slotu jako prop (<code>children</code>
        , <code>team</code>, <code>analytics</code>, …) i umieszcza ją w
        interfejsie, więc kilka stron renderuje się obok siebie dla jednego
        URL.
      </p>
    ),
  },
  {
    question: "Dlaczego trasa równoległa daje 404 po odświeżeniu, ale nie przy nawigacji po stronie klienta?",
    answer: (
      <p>
        Przy miękkiej nawigacji Next.js zachowuje poprzedni aktywny stan
        każdego slotu. Po pełnym załadowaniu może dopasować sloty tylko do
        bieżącego URL, więc niedopasowany slot renderuje{" "}
        <code>default.tsx</code> albo 404, gdy go brak. 404 zapobiega
        pojawieniu się slotu pod adresem, do którego nie był przeznaczony.
      </p>
    ),
  },
  {
    question: "Co robi default.tsx i czy dotyczy children?",
    answer: (
      <p>
        To fallback dla slotu, który nie ma dopasowania przy twardej
        nawigacji. <code>children</code> to niejawny slot, więc też potrzebuje
        własnego <code>default.tsx</code>, ilekroć głębszy URL pasuje tylko do
        części slotów.
      </p>
    ),
  },
  {
    question: "Jakie są zalety tras równoległych poza elastycznością layoutu?",
    answer: (
      <p>
        Niezależny streaming i obsługa błędów dla każdego slotu (każdy może
        mieć własny <code>loading.tsx</code> i <code>error.tsx</code>),
        warunkowe renderowanie zależne od slotu (np. według roli), grupy
        zakładek, a w połączeniu z trasami przechwytującymi modale z własnym
        URL.
      </p>
    ),
  },
  {
    question: "Czy folder @slot liczy się jako segment dla konwencji (..)?",
    answer: (
      <p>
        Nie. Konwencje przechwytywania liczą segmenty tras, a nie foldery na
        dysku, więc foldery <code>@slot</code> są pomijane.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Trasy równoległe",
  summary: "Renderowanie kilku stron w jednym layoucie za pomocą folderów @slot.",
  basics,
  edgeCases,
  interviewQuestions,
};
