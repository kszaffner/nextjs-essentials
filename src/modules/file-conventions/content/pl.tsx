import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/fundamentals/file-conventions/demo";

const basics = (
  <>
    <p>
      Segment trasy to folder; specjalne nazwy plików w środku decydują, co
      segment renderuje. Next.js zagnieżdża je w stałej kolejności:{" "}
      <code>layout</code> → <code>template</code> → <code>error</code> →{" "}
      <code>loading</code> → <code>not-found</code> → <code>page</code>.
    </p>
    <ul>
      <li>
        <code>page.tsx</code> sprawia, że segment jest publicznie dostępny.
        Folder bez niego nie jest trasą.
      </li>
      <li>
        <code>layout.tsx</code> to wspólny interfejs, który pozostaje
        zamontowany podczas nawigacji między jego dziećmi, więc stan (i DOM)
        przeżywa.
      </li>
      <li>
        <code>template.tsx</code> działa jak layout, ale montuje się od nowa
        za każdym razem, gdy zmienia się segment potomny pod nim.
      </li>
      <li>
        <code>loading.tsx</code> opakowuje stronę (i zagnieżdżone layouty) w
        granicę <code>&lt;Suspense&gt;</code> z tym fallbackiem.
      </li>
      <li>
        <code>error.tsx</code> to granica błędów (Client Component) dla
        segmentu i wszystkiego pod nim.
      </li>
      <li>
        <code>not-found.tsx</code> renderuje się, gdy segment wywoła{" "}
        <code>notFound()</code>.
      </li>
      <li>
        Foldery <code>(group)</code> porządkują trasy bez wpływu na URL;
        foldery <code>_private</code> całkowicie wyłączają się z routingu.
      </li>
    </ul>
    <p>
      Wypróbuj to w <LocalizedLink href={demoHref}>demie na żywo</LocalizedLink>: wpisz tekst w pole
      layoutu i w pole template, a potem użyj linków z dema. Pole layoutu
      zachowuje tekst; pole template zostaje wyczyszczone.
    </p>
    <CodeBlock title="app/dashboard/" code={`
// Jak zagnieżdżone są pliki specjalne jednego segmentu (od zewnątrz):
<Layout>                              {/* layout.tsx: trwa między nawigacjami */}
  <Template>                          {/* template.tsx: montuje się od nowa */}
    <ErrorBoundary fallback={<Error />}>          {/* error.tsx */}
      <Suspense fallback={<Loading />}>           {/* loading.tsx */}
        <NotFoundBoundary fallback={<NotFound />}> {/* not-found.tsx */}
          <Page />                    {/* page.tsx: udostępnia trasę */}
        </NotFoundBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
`} />
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>error.tsx</code> nie przechwytuje błędów z layoutu ani
        template tego samego segmentu.
      </strong>{" "}
      Trafiają one do granicy segmentu nadrzędnego. Błędy w root layoucie
      wymagają <code>global-error.tsx</code>.
    </li>
    <li>
      <strong>
        <code>loading.tsx</code> nie obejmuje layoutu własnego segmentu.
      </strong>{" "}
      Przy Cache Components dane runtime czytane w layoucie potrzebują
      własnej granicy <code>&lt;Suspense&gt;</code>, inaczej build się
      nie powiedzie.
    </li>
    <li>
      <strong>Layouty nie renderują się ponownie przy nawigacji,</strong> więc
      layout będący Server Componentem nie może wiarygodnie czytać bieżącej
      ścieżki ani search params. Czytaj je w Client Componencie przez{" "}
      <code>usePathname</code> / <code>useSearchParams</code>.
    </li>
    <li>
      <strong>Ponowne zamontowanie template kosztuje stan i DOM.</strong> Stan
      klienta się zeruje, efekty uruchamiają się od nowa, a fallbacki Suspense
      pokazują się przy każdej nawigacji, nie tylko przy pierwszym
      załadowaniu.
    </li>
    <li>
      <strong>
        Dwie grupy tras nie mogą prowadzić do tego samego URL
      </strong>{" "}
      (<code>(a)/about</code> i <code>(b)/about</code> to błąd builda).
      Nawigacja między różnymi root layoutami powoduje pełne przeładowanie
      strony.
    </li>
    <li>
      <strong>
        Foldery <code>_private</code> nie są routowalne
      </strong>{" "}
      (
      <LocalizedLink href={`${demoHref}/_private`} prefetch={false}>
        link w demie
      </LocalizedLink>{" "}
      daje 404). Aby uzyskać dosłowne podkreślenie w URL, wpisz{" "}
      <code>%5F</code>.
    </li>
    <li>
      <strong>
        <code>page.tsx</code> i <code>route.ts</code> nie mogą dzielić
        segmentu.
      </strong>{" "}
      Oba przejęłyby ten sam URL.
    </li>
    <li>
      <strong>Na produkcji błędy Server Components są maskowane.</strong>{" "}
      <code>error.tsx</code> dostaje ogólny komunikat i <code>digest</code>,
      po którym znajdziesz wpis w logach serwera.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym różni się layout.tsx od template.tsx?",
    answer: (
      <p>
        Oba opakowują dzieci, ale layout przetrwa nawigację (bez ponownego
        montowania, stan zostaje), a template dostaje nowy klucz, gdy zmienia
        się segment potomny, i montuje się od nowa: stan się zeruje, efekty
        uruchamiają się ponownie, DOM jest tworzony na nowo. W demie pole
        layoutu zachowuje tekst, a pole template nie.
      </p>
    ),
  },
  {
    question: "W jakiej kolejności zagnieżdżają się specjalne pliki?",
    answer: (
      <p>
        <code>layout</code> → <code>template</code> → <code>error</code>{" "}
        (granica błędów) → <code>loading</code> (Suspense) →{" "}
        <code>not-found</code> → <code>page</code>. Ta kolejność tłumaczy, co
        każdy plik może, a czego nie może przechwycić lub objąć.
      </p>
    ),
  },
  {
    question: "Dlaczego error.tsx musi być Client Componentem i czego nie przechwytuje?",
    answer: (
      <p>
        Granice błędów to mechanizm Reacta działający po stronie klienta, więc
        plik potrzebuje <code>&quot;use client&quot;</code>. Opakowuje stronę
        segmentu i zagnieżdżone layouty, ale nie layout ani template tego
        samego segmentu; dla root layoutu użyj <code>global-error.tsx</code>.
        Nie przechwytuje też błędów w event handlerach ani w Server Actions.
      </p>
    ),
  },
  {
    question: "Jak działa loading.tsx?",
    answer: (
      <p>
        To lukier składniowy na granicę <code>&lt;Suspense&gt;</code> wokół
        strony i zagnieżdżonych layoutów, z <code>loading.tsx</code> jako
        fallbackiem. Fallback jest prefetchowany, więc nawigacja może go
        pokazać natychmiast, gdy strona jest jeszcze streamowana.
      </p>
    ),
  },
  {
    question: "Czy grupy tras zmieniają URL? Kiedy ich użyć?",
    answer: (
      <p>
        Nie: <code>(group)</code> jest pomijane w ścieżce. Używa się ich do
        porządkowania według funkcji lub zespołu, do objęcia wspólnym layoutem
        tylko wybranych tras albo do zdefiniowania wielu root layoutów. Uwaga
        na pułapki: grupy nie mogą kolidować na jednym URL, a przejście między
        root layoutami to pełne przeładowanie strony.
      </p>
    ),
  },
  {
    question: "Jak wyłączyć folder z routingu?",
    answer: (
      <p>
        Dodaj na początku podkreślenie (<code>_components</code>). Folder leży
        obok tras, ale nigdy nie staje się segmentem. Folder bez{" "}
        <code>page.tsx</code> lub <code>route.ts</code> też jest niedostępny,
        ale podkreślenie jasno wyraża zamiar i chroni przed przypadkowym
        dodaniem takiego pliku.
      </p>
    ),
  },
  {
    question: "Co się dzieje, gdy strona wywoła notFound()?",
    answer: (
      <p>
        Renderowanie się zatrzymuje, a w jego miejsce renderuje się
        najbliższy <code>not-found.tsx</code>, wewnątrz otaczających layoutów.
        Główny <code>not-found.tsx</code> obsługuje też każdy URL, który nie
        pasuje do żadnej trasy.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Konwencje plików",
  summary: "page, layout, template, loading, error, not-found, grupy tras i foldery prywatne.",
  basics,
  edgeCases,
  interviewQuestions,
};
