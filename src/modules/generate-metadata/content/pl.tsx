import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/metadata/generate-metadata/demo";

export const basics = (
  <>
    <p>
      Next.js buduje <code>&lt;head&gt;</code> z eksportowanych przez ciebie
      metadanych, a nie z tagów, które piszesz. Dwa sposoby, oba tylko w Server
      Components:
    </p>
    <ul>
      <li>
        <strong>Statyczny:</strong> <code>export const metadata = {"{ … }"}</code>{" "}
        w <code>layout</code> lub <code>page</code>.
      </li>
      <li>
        <strong>Dynamiczny:</strong>{" "}
        <code>export async function generateMetadata({"{ params }"})</code>, który
        może pobierać dane i zwracać ten sam kształt.
      </li>
    </ul>
    <CodeBlock code={`// layout: wartości domyślne dla wszystkiego poniżej
export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: { template: "%s | Site", default: "Site" },
};

// page: wyliczane per element
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);      // z cache dzięki React cache()
  return { title: article.title, alternates: { canonical: \`/blog/\${slug}\` } };
}`} />
    <p>
      <code>metadataBase</code> pozwala każdemu polu z URL użyć ścieżki
      względnej: <code>canonical</code> powyżej staje się bezwzględnym URL-em.
      Otwórz <LocalizedLink href={demoHref}>demo</LocalizedLink>: dwie trasy
      budują metadane dla tego samego artykułu, a przycisk wypisuje tagi, które
      przeglądarka naprawdę dostała. Zaobserwowane w prerenderowanym HTML:
    </p>
    <ul>
      <li>
        tytuł to tytuł strony opakowany szablonem z layoutu (
        <code>Alpha: the first article · generateMetadata demo</code>);
      </li>
      <li>
        <code>canonical</code> w kodzie to <code>/metadata/…/alpha</code>, a w
        wyniku bezwzględny URL;
      </li>
      <li>
        pierwsza trasa ma tylko <code>og:title</code> i{" "}
        <code>og:description</code>, a druga także <code>og:site_name</code> i{" "}
        <code>og:type</code> (zob. pierwszy przypadek brzegowy).
      </li>
    </ul>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Scalanie jest płytkie.</strong> Layout zdefiniował{" "}
      <code>openGraph: {"{ siteName, type }"}</code>; strona, która zwróciła
      własne <code>openGraph: {"{ title, description }"}</code>,{" "}
      <em>zastąpiła</em> cały obiekt, więc <code>og:site_name</code> i{" "}
      <code>og:type</code> zniknęły. Poprawka w drugiej trasie czyta
      rozwiązane metadane rodzica i je rozsmarowuje:{" "}
      <code>{"{ ...(await parent).openGraph, title }"}</code>.
    </li>
    <li>
      <strong>
        <code>metadataBase</code> jest wpisane na stałe w czasie builda.
      </strong>{" "}
      Zbudowane bez <code>SITE_ORIGIN</code>, każdy canonical,{" "}
      <code>og:image</code>, sitemap i robots wskazywały na{" "}
      <code>http://localhost:3000</code>, nawet gdy serwer później wystartował z
      ustawioną zmienną. Ustaw origin w środowisku <em>builda</em>.
    </li>
    <li>
      <strong>Nie buduj bazy z żądania.</strong> URL witryny pochodzi z
      konfiguracji (<code>SITE_ORIGIN</code> lub domena produkcyjna Vercel),
      więc wołający nie może sprawić, by twoje strony reklamowały jego host.
    </li>
    <li>
      <strong>Pobierz raz, użyj dwa razy.</strong> <code>generateMetadata</code>{" "}
      i strona oba potrzebują artykułu. Opakowanie loadera w React{" "}
      <code>cache()</code> (lub użycie <code>fetch</code>, który jest
      memoizowany) sprawia, że wyszukiwanie wykona się raz na render.
    </li>
    <li>
      <strong>Dane runtime odsuwają metadane.</strong> Przy Cache Components
      metadane czytające <code>cookies()</code>, <code>headers()</code> lub dane
      bez cache dopływają w czasie żądania. Jeśli reszta strony jest w pełni
      prerenderowalna, Next.js zgłasza błąd i prosi o jawny wybór: zcache&apos;uj
      dane przez <code>&quot;use cache&quot;</code> albo dodaj znacznik
      dynamiczny. <code>generateMetadata</code> z{" "}
      <code>&quot;use cache&quot;</code> musi zwracać wartości serializowalne,
      więc zwróć <code>metadataBase</code> jako string, nie <code>URL</code>.
    </li>
    <li>
      <strong>Dla crawlerów streaming jest pomijany.</strong> Dla stron
      dynamicznych metadane dopływają po pierwszym renderze, ale dla botów takich
      jak Twitterbot, Slackbot i Bingbot Next.js blokuje, aż trafią do{" "}
      <code>&lt;head&gt;</code> (konfigurowalne przez{" "}
      <code>htmlLimitedBots</code>). Strony prerenderowane rozwiązują je w
      czasie builda.
    </li>
    <li>
      <strong>Nieznany parametr powinien dać 404.</strong> Demo wywołuje{" "}
      <code>notFound()</code> dla nieznanego sluga, ze wspólnego loadera, więc
      metadane i strona się zgadzają (status to prawdziwe 404).
    </li>
    <li>
      <strong>Nigdy nie pisz tagów head ręcznie.</strong> Wstawienie{" "}
      <code>&lt;title&gt;</code> lub <code>&lt;meta&gt;</code> w layoucie omija
      streaming i deduplikację; użyj API metadanych.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "metadata czy generateMetadata?",
    answer: (
      <p>
        Użyj statycznego obiektu <code>metadata</code>, gdy wartości są znane z
        góry; użyj <code>generateMetadata</code>, gdy zależą od parametrów lub
        pobranych danych. Oba działają tylko w Server Components i są scalane od
        root layoutu w dół do strony.
      </p>
    ),
  },
  {
    question: "Jak łączą się obiekty metadanych z layoutu i strony?",
    answer: (
      <p>
        Płytko, od korzenia w dół: późniejszy segment zastępuje wcześniejsze
        klucze w całości. Zagnieżdżony obiekt taki jak <code>openGraph</code>{" "}
        zdefiniowany na stronie zastępuje ten z layoutu w całości. By go
        rozszerzyć, odczytaj rozwiązane metadane rodzica i je rozsmaruj.
      </p>
    ),
  },
  {
    question: "Co robi metadataBase?",
    answer: (
      <p>
        To bazowy URL dla pól z URL-ami, więc możesz pisać ścieżki względne (
        <code>canonical: &quot;/blog/x&quot;</code>, obraz Open Graph) i dostać
        bezwzględne URL-e. Ustaw go raz w root layoucie i upewnij się, że
        wartość istnieje w czasie builda, bo prerenderowane strony ją wpisują na
        stałe.
      </p>
    ),
  },
  {
    question: "Jak uniknąć pobierania tych samych danych w generateMetadata i na stronie?",
    answer: (
      <p>
        Memoizacja żądań: wywołania <code>fetch</code> z tym samym URL i opcjami
        są deduplikowane w jednym renderze, a inne loadery można opakować w{" "}
        <code>React.cache()</code>. Demo robi to drugie i loader wykonuje się
        raz.
      </p>
    ),
  },
  {
    question: "Co dzieje się z generateMetadata przy Cache Components?",
    answer: (
      <p>
        Podlega zwykłym regułom: dane runtime lub bez cache odsuwają go na czas
        żądania, a jeśli strona poza tym jest statyczna, Next.js każe wybrać
        między zcache&apos;owaniem danych (<code>&quot;use cache&quot;</code>) a
        oznaczeniem strony jako dynamicznej. Metadane dopływają strumieniem dla
        przeglądarek, ale dla crawlerów są blokujące.
      </p>
    ),
  },
  {
    question: "Dlaczego title.template jest przydatny?",
    answer: (
      <p>
        Layout ustawia wzorzec raz (<code>&quot;%s | Site&quot;</code>), a
        każda strona podaje tylko własny tytuł, więc przyrostek jest spójny i nie
        da się o nim zapomnieć.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "generateMetadata",
  summary: "Metadane statyczne i dynamiczne oraz metadataBase.",
  basics,
  edgeCases,
  interviewQuestions,
};
