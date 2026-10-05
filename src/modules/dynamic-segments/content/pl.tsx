import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { DemoLinks } from "../components/DemoLinks";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoBase = "/fundamentals/dynamic-segments/demo";

function DemoLink({ path, children }: { path: string; children: string }) {
  return (
    <LocalizedLink href={`${demoBase}/${path}`} prefetch={false}>
      {children}
    </LocalizedLink>
  );
}

const basics = (
  <>
    <p>
      Ujęcie nazwy folderu w nawiasy kwadratowe zamienia segment w parametr.
      Next.js przekazuje przechwycone wartości do <code>page</code>,{" "}
      <code>layout</code>, <code>route</code> i <code>generateMetadata</code>{" "}
      jako prop <code>params</code>, który jest <code>Promise</code>:
      użyj <code>await</code> w Server Componencie albo <code>use()</code> w
      Client Componencie.
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Folder</th>
          <th scope="col">Pasuje do</th>
          <th scope="col">
            Typ <code>params</code>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>blog/[slug]</code>
          </td>
          <td>
            <code>/blog/a</code>
          </td>
          <td>
            <code>{"{ slug: string }"}</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>shop/[...slug]</code>
          </td>
          <td>
            <code>/shop/a</code>, <code>/shop/a/b</code>, …
          </td>
          <td>
            <code>{"{ slug: string[] }"}</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>docs/[[...slug]]</code>
          </td>
          <td>
            <code>/docs</code> i wszystko, co dopasuje catch-all
          </td>
          <td>
            <code>{"{ slug?: string[] }"}</code>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Przy Cache Components params to dane runtime, chyba że{" "}
      <code>generateStaticParams</code> dostarczy próbki. Bez niego czytaj{" "}
      <code>params</code> wewnątrz granicy <code>&lt;Suspense&gt;</code> (robią
      tak dema catch-all); z nim wymienione wartości są prerenderowane w
      czasie builda (tak jest w demie bloga), a każda inna wartość
      renderuje się przy pierwszym żądaniu i trafia do cache.
    </p>
    <p>
      W tej aplikacji <code>params</code> zawiera też klucz <code>lang</code>:
      to segment <code>[lang]</code> z korzenia aplikacji (język strony).
      Dema poniżej pokazują go osobno, bo <code>params</code> zawiera zawsze
      wartości <em>wszystkich</em> dynamicznych segmentów nad stroną.
    </p>
    <p>
      Wypróbuj: <DemoLink path="blog/hello-nextjs">/blog/hello-nextjs</DemoLink>
      , <DemoLink path="shop/clothes/tops/t-shirts">/shop/clothes/tops/t-shirts</DemoLink>
      , <DemoLink path="docs">/docs</DemoLink> lub dowolny z poniższych:
    </p>
    <DemoLinks />
    <CodeBlock title="app/blog/[slug]/page.tsx" code={`
// app/blog/[slug]/page.tsx       /blog/hello         -> { slug: "hello" }
// app/docs/[...slug]/page.tsx    /docs/a/b           -> { slug: ["a", "b"] }
//                                /docs               -> brak dopasowania (404)
// app/shop/[[...slug]]/page.tsx  /shop               -> { slug: undefined }
//                                /shop/a/b           -> { slug: ["a", "b"] }

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params; // params to Promise
  return <h1>{slug}</h1>;
}
`} />
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Params nie są dekodowane.</strong> Żądanie{" "}
      <DemoLink path="blog/hello%20world">/blog/hello%20world</DemoLink>{" "}
      daje <code>params.slug === &quot;hello%20world&quot;</code>, a{" "}
      <code>a%2Fb</code> zostaje <code>a%2Fb</code>. Użyj{" "}
      <code>decodeURIComponent</code>, gdy wartość ma być wyświetlona albo
      użyta do wyszukiwania.
    </li>
    <li>
      <strong>Params to niezaufane stringi.</strong> <code>/blog/42</code>{" "}
      daje <code>&quot;42&quot;</code>, a nie liczbę, i użytkownik może
      wpisać dowolny URL. Waliduj i zawężaj wartość, a dla wartości, których
      nie obsługujesz, wywołaj <code>notFound()</code> (
      <DemoLink path="validated/99">/validated/99</DemoLink>).
    </li>
    <li>
      <strong>
        <code>dynamicParams = false</code> nie buduje się z Cache Components.
      </strong>{" "}
      Ta konfiguracja segmentu jest odrzucana w czasie builda, więc nieznane
      wartości odrzucaj walidacją parametru. Bez Cache Components każda
      wartość spoza <code>generateStaticParams</code> dawałaby 404.
    </li>
    <li>
      <strong>
        <code>generateStaticParams</code> musi zwrócić co najmniej jeden
        parametr
      </strong>{" "}
      przy Cache Components. Pusta tablica to błąd builda, bo to próbki
      pozwalają Next.js zwalidować trasę podczas builda.
    </li>
    <li>
      <strong>Params w runtime potrzebują Suspense.</strong> Czytanie{" "}
      <code>params</code> bez <code>generateStaticParams</code> i poza
      granicą <code>&lt;Suspense&gt;</code> wywala build. Ta sama zasada
      dotyczy każdego Client Componentu wywołującego <code>usePathname()</code>
      , także paska bocznego tej strony.
    </li>
    <li>
      <strong>Nie rób await na params na górze layoutu.</strong> Cały layout
      czekałby na dane runtime i wypadłby ze statycznej powłoki. Przekaż
      promise niżej i czekaj tam, gdzie wartość jest używana.
    </li>
    <li>
      <strong>Segment statyczny wygrywa z dynamicznym rodzeństwem.</strong>{" "}
      <DemoLink path="blog/featured">/blog/featured</DemoLink> obsługuje
      własny folder, więc <code>[slug]</code> nigdy nie dostaje{" "}
      <code>featured</code>.
    </li>
    <li>
      <strong>Catch-all a opcjonalny catch-all.</strong>{" "}
      <DemoLink path="shop">/shop</DemoLink> to 404 dla{" "}
      <code>[...slug]</code>, a <DemoLink path="docs">/docs</DemoLink>{" "}
      pasuje do <code>[[...slug]]</code> bez klucza <code>slug</code> w{" "}
      <code>params</code> (klucza nie ma, to nie to samo co{" "}
      <code>undefined</code>). Dlatego <code>page.tsx</code> obok{" "}
      <code>[[...slug]]</code> w tym samym folderze to konflikt.
    </li>
    <li>
      <strong>Rodzeństwo dynamicznych folderów musi mieć tę samą nazwę.</strong>{" "}
      <code>[id]</code> i <code>[slug]</code> na tym samym poziomie to błąd
      builda.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak odczytać dynamiczny segment w App Routerze?",
    answer: (
      <p>
        Przez prop <code>params</code> w <code>page</code>, <code>layout</code>,{" "}
        <code>route</code> lub <code>generateMetadata</code>. To{" "}
        <code>Promise</code>, więc <code>await params</code> w Server
        Componencie albo <code>use(params)</code> na stronie będącej Client
        Componentem. Głębiej w drzewie Client Components działa też{" "}
        <code>useParams()</code>.
      </p>
    ),
  },
  {
    question: "Czym różni się [...slug] od [[...slug]]?",
    answer: (
      <p>
        Oba przechwytują dowolną liczbę segmentów jako <code>string[]</code>.
        Wymagany catch-all potrzebuje co najmniej jednego segmentu (
        <code>/shop</code> to 404); opcjonalny pasuje też do samej ścieżki (
        <code>/docs</code>) i wtedy w <code>params</code> nie ma{" "}
        <code>slug</code>.
      </p>
    ),
  },
  {
    question: "Jak typowane są params i dlaczego to problem?",
    answer: (
      <p>
        Jako <code>string</code>, <code>string[]</code> lub{" "}
        <code>undefined</code>, bo prawdziwa wartość to cokolwiek użytkownik
        wpisze w URL. Traktuj ją jak każde niezaufane wejście: waliduj,
        zawężaj do własnego typu i wywołaj <code>notFound()</code>, gdy to nie
        jest coś, co obsługujesz. Wartości przychodzą też zakodowane
        procentowo.
      </p>
    ),
  },
  {
    question: "Co robi generateStaticParams i co zmieniają Cache Components?",
    answer: (
      <p>
        Zwraca zestawy parametrów do prerenderowania w czasie builda. Inne
        wartości renderują się przy pierwszym żądaniu i trafiają do cache. Z
        Cache Components musi zwrócić co najmniej jeden parametr (pusta tablica
        to błąd builda), pozwala buildowi zwalidować użycie API runtime w
        trasie, a bez niego params liczą się jako dane runtime, które trzeba
        czytać wewnątrz <code>&lt;Suspense&gt;</code>.
      </p>
    ),
  },
  {
    question: "Jak sprawić, by nieznane params zwracały 404?",
    answer: (
      <p>
        Klasycznie przez <code>dynamicParams = false</code>, co daje 404 dla
        każdej wartości spoza <code>generateStaticParams</code>. Ta konfiguracja
        segmentu jest odrzucana przy włączonych Cache Components, więc
        waliduj parametr na stronie i wywołaj <code>notFound()</code>, jak w
        demie walidacji.
      </p>
    ),
  },
  {
    question: "Dwie trasy mogą pasować do /blog/featured. Która wygrywa?",
    answer: (
      <p>
        Bardziej szczegółowa: segment statyczny (<code>blog/featured</code>)
        bije dynamiczny (<code>blog/[slug]</code>), który bije catch-all.
        Trasa dynamiczna nigdy nie dostaje <code>featured</code> jako slug.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Segmenty dynamiczne",
  summary: "[slug], catch-all [...slug] i opcjonalny catch-all [[...slug]].",
  basics,
  edgeCases,
  interviewQuestions,
};
