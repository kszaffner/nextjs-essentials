import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/errors/not-found/demo";

export const basics = (
  <>
    <p>
      Wywołanie <code>notFound()</code> zatrzymuje renderowanie i pokazuje
      najbliższy <code>not-found.tsx</code>. Główny <code>not-found.tsx</code>{" "}
      odpowiada też na każdy URL, który nie pasuje do żadnej trasy. Segmenty mogą
      mieć własną wersję, więc brakujący element może powiedzieć „nie ma takiego
      elementu”, a nieznany URL „nie znaleziono strony”.
    </p>
    <CodeBlock code={`export default async function Page({ params }) {
  const { slug } = await params;
  if (!isKnownSlug(slug)) {
    notFound();           // rzuca; renderuje się najbliższy not-found.tsx
  }
  return <Item slug={slug} />;
}`} />
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> sprawdza status HTTP
      pięciu żądań na buildzie produkcyjnym:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Żądanie</th>
          <th scope="col">Status</th>
          <th scope="col">noindex</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Istniejący slug</td>
          <td>200</td>
          <td>nie</td>
        </tr>
        <tr>
          <td>
            Nieznany slug, <code>notFound()</code> przed streamingiem
          </td>
          <td>
            <strong>404</strong>
          </td>
          <td>tak</td>
        </tr>
        <tr>
          <td>
            Nieznany slug, <code>notFound()</code> wewnątrz Suspense
          </td>
          <td>
            <strong>200</strong>
          </td>
          <td>tak</td>
        </tr>
        <tr>
          <td>URL niepasujący do żadnej trasy</td>
          <td>404</td>
          <td>tak</td>
        </tr>
      </tbody>
    </table>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Miejsce wywołania decyduje o statusie.</strong> Zanim cokolwiek
      się zastrumieniuje, <code>notFound()</code> daje prawdziwe{" "}
      <code>404</code>. Wewnątrz granicy <code>&lt;Suspense&gt;</code>, po
      wysłaniu powłoki, status to już <code>200</code> i nie da się go zmienić.
      Sprawdź, czy zasób istnieje, przed jakąkolwiek granicą i przed każdym{" "}
      <code>await</code>, który może zawiesić, jeśli potrzebujesz 404 (dla
      narzędzi SEO, analityki lub monitoringu).
    </li>
    <li>
      <strong>Zastrumieniowane 404 nadal ma noindex.</strong> Next.js dodaje{" "}
      <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;&gt;</code>{" "}
      do odpowiedzi not-found, także zastrumieniowanej, więc wyszukiwarki jej
      nie indeksują, mimo że status to 200 (część crawlerów nazywa to „soft
      404”).
    </li>
    <li>
      <strong>Działa przez rzucenie.</strong> Payload przypadku ze streamingiem
      niósł digest <code>NEXT_HTTP_ERROR_FALLBACK;404</code>.{" "}
      <code>try/catch</code> wokół <code>notFound()</code> go połyka; wywołaj go
      poza blokiem albo rzuć ponownie przez <code>unstable_rethrow</code>.
    </li>
    <li>
      <strong>Wygrywa najbliższy plik.</strong> Własny <code>not-found.tsx</code>{" "}
      segmentu odpowiada na wywołania <code>notFound()</code> pod nim; główny
      odpowiada na niedopasowane URL-e i wszystko bez bliższego pliku.
    </li>
    <li>
      <strong>Niedopasowane URL-e to zadanie głównego pliku.</strong> Ścieżka
      głębsza niż jakakolwiek trasa (<code>/demo/no/such/route</code>) wyrenderowała
      główny <code>not-found.tsx</code> z <code>404</code>. Eksperymentalny{" "}
      <code>global-not-found.tsx</code> może zastąpić cały dokument dla
      niedopasowanych URL-i.
    </li>
    <li>
      <strong>Waliduj parametry, zanim ich użyjesz.</strong> Slug to tekst
      sterowany przez użytkownika; sprawdź go w swoich danych i wywołaj{" "}
      <code>notFound()</code> dla wszystkiego, czego nie serwujesz, zamiast
      renderować z nim.
    </li>
    <li>
      <strong>Domyślne 404 ignoruje twój motyw.</strong> Wbudowana strona
      Next.js podąża tylko za schematem kolorów systemu; dostarcz własny plik, by
      to kontrolować.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Co robi notFound()?",
    answer: (
      <p>
        Rzuca specjalny błąd, który zatrzymuje renderowanie i sprawia, że
        Next.js renderuje najbliższy <code>not-found.tsx</code> wewnątrz
        otaczających layoutów. Użyj go, gdy żądany zasób nie istnieje.
      </p>
    ),
  },
  {
    question: "Dlaczego strona not-found może zwrócić 200?",
    answer: (
      <p>
        Jeśli <code>notFound()</code> wykona się po rozpoczęciu streamingu
        odpowiedzi (wewnątrz Suspense), status został już wysłany. Next.js dodaje
        wtedy meta tag <code>noindex</code>. By dostać prawdziwe 404, sprawdź
        zasób przed jakąkolwiek granicą Suspense.
      </p>
    ),
  },
  {
    question: "Czym różni się not-found.tsx w segmencie od tego w korzeniu?",
    answer: (
      <p>
        Plik segmentu odpowiada na wywołania <code>notFound()</code> z tego
        segmentu i niżej, z komunikatem w kontekście. Plik główny odpowiada na te
        bez bliższego pliku oraz na każdy URL niepasujący do żadnej trasy.
      </p>
    ),
  },
  {
    question: "Dlaczego notFound() nie działa wewnątrz try/catch?",
    answer: (
      <p>
        Sygnalizuje przez rzucenie, więc blok <code>catch</code> go połyka.
        Wywołaj go poza blokiem albo rzuć ponownie błędy Next.js przez{" "}
        <code>unstable_rethrow</code>.
      </p>
    ),
  },
  {
    question: "Jak obsłużyć nieznane parametry dynamiczne?",
    answer: (
      <p>
        Sprawdź parametr w swoich danych i wywołaj <code>notFound()</code>, jeśli
        go nie ma. (<code>dynamicParams = false</code> jest odrzucane przy Cache
        Components, więc walidacja to właściwa droga.)
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Not found",
  summary: "not-found.tsx i notFound().",
  basics,
  edgeCases,
  interviewQuestions,
};
