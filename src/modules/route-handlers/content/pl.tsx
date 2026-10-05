import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/advanced-routing/route-handlers/demo";

export const basics = (
  <>
    <p>
      <strong>Route Handler</strong> to plik <code>route.ts</code>, który
      eksportuje funkcję na każdą metodę HTTP (<code>GET</code>,{" "}
      <code>POST</code>, <code>PUT</code>, <code>PATCH</code>,{" "}
      <code>DELETE</code>, <code>HEAD</code>, <code>OPTIONS</code>). To
      najniższy poziom routingu: przyjmuje żądanie i zwraca odpowiedź, bez
      layoutów i bez nawigacji po stronie klienta.
    </p>
    <CodeBlock code={`export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit");
  return NextResponse.json({ notes }, { status: 200 });
}

export async function GET(_request: NextRequest, context: RouteContext<"/api/notes/[id]">) {
  const { id } = await context.params;     // params to Promise
}`} />
    <p>
      <code>NextRequest</code> i <code>NextResponse</code> rozszerzają webowe{" "}
      <code>Request</code> i <code>Response</code> o pomocniki takie jak{" "}
      <code>nextUrl.searchParams</code>, <code>cookies</code> i{" "}
      <code>NextResponse.json()</code>. Użyj konsoli w{" "}
      <LocalizedLink href={demoHref}>demo</LocalizedLink>, by zobaczyć kody
      statusu, które zwraca to API notatek:
    </p>
    <ul>
      <li>
        <code>200</code> dla odczytu, <code>201</code> z nagłówkiem{" "}
        <code>Location</code> dla utworzenia, <code>204</code> bez body dla
        usunięcia.
      </li>
      <li>
        <code>400</code> dla błędnego JSON lub zapytania, <code>422</code> dla
        body, które się parsuje, ale łamie reguły, <code>404</code> dla
        nieznanego id, <code>415</code> dla złego typu zawartości.
      </li>
      <li>
        <code>405</code> dla metody, której plik nie eksportuje.
      </li>
    </ul>
    <p>
      Każdy błąd ma jeden kształt, <code>{"{ code, message, details? }"}</code>,
      więc wołający obsłuży błędy bez parsowania prozy.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        Żadnego <code>page.tsx</code> obok <code>route.ts</code>.
      </strong>{" "}
      Oba zajęłyby ten sam URL, więc to konflikt; dlatego API leżą pod{" "}
      <code>app/api</code>.
    </li>
    <li>
      <strong>Nieobsługiwane metody odpowiadają za ciebie.</strong>{" "}
      <code>PUT</code> do pliku eksportującego tylko <code>GET</code> i{" "}
      <code>POST</code> zwrócił <code>405</code>. <code>HEAD</code> zadziałał, a{" "}
      <code>OPTIONS</code> zwrócił <code>204</code> z{" "}
      <code>allow: GET, HEAD, OPTIONS, POST</code> bez żadnego kodu.
    </li>
    <li>
      <strong>Brak wbudowanej ochrony CSRF.</strong> Server Actions porównują
      nagłówek <code>Origin</code> z hostem; Route Handlery nie. POST z{" "}
      <code>Origin: http://evil.example</code> został przyjęty (201). Demo
      wymaga <code>Content-Type: application/json</code> (cokolwiek innego dostaje{" "}
      <code>415</code>), co zmusza przeglądarki do preflightu żądania
      międzydomenowego. Wszystko uwierzytelniane cookies potrzebuje własnej
      ochrony.
    </li>
    <li>
      <strong>Waliduj każde wejście.</strong> Query stringi to stringi:{" "}
      <code>?limit=abc</code> jest parsowane schematem i odrzucane przez{" "}
      <code>400</code>. Body parsuje się dwa razy: <code>request.json()</code>{" "}
      może rzucić (błędny JSON, <code>400</code>), a potem schemat sprawdza
      kształt (<code>422</code>).
    </li>
    <li>
      <strong>Cache podąża za modelem stron.</strong> Przy Cache Components
      handler <code>GET</code>, który nie dotyka danych runtime ani danych bez
      cache, może być prerenderowany; ten, którego dane się zmieniają, musi
      działać per żądanie. Demo wywołuje <code>connection()</code>, więc nigdy
      nie zamarza w buildzie, a wynik builda oznacza go <code>ƒ</code>. Inne
      metody nie są nigdy cache&apos;owane.
    </li>
    <li>
      <strong>Memoizacja nie obowiązuje.</strong> Identyczne wywołania{" "}
      <code>fetch</code> w handlerze nie są deduplikowane tak jak podczas
      renderu komponentu.
    </li>
    <li>
      <strong>Body można przeczytać raz.</strong> <code>request.json()</code>{" "}
      zużywa strumień; sklonuj żądanie, jeśli dwa miejsca go potrzebują.
    </li>
    <li>
      <strong>Nieprzechwycony throw staje się gołym 500.</strong> Przechwytuj to,
      na co możesz zareagować, i zwracaj ustrukturyzowany błąd (zob. temat o
      obsłudze błędów).
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym jest Route Handler i kiedy go użyć?",
    answer: (
      <p>
        Plik <code>route.ts</code> eksportujący funkcję na metodę HTTP,
        zwracającą <code>Response</code>. Użyj go do publicznych API, webhooków
        i wszystkiego, co nie jest UI. Do formularzy i mutacji z własnego UI
        zwykle prostsza jest Server Action.
      </p>
    ),
  },
  {
    question: "Dlaczego route.ts i page.tsx nie mogą dzielić segmentu?",
    answer: (
      <p>
        Każdy przejmuje wszystkie czasowniki HTTP dla swojego URL, więc się
        konfliktują. Handlery umieszczaj pod ścieżką taką jak{" "}
        <code>app/api/…</code>.
      </p>
    ),
  },
  {
    question: "Który kod statusu dla jakiego błędu?",
    answer: (
      <p>
        <code>400</code> błędne żądanie, <code>422</code> poprawne formalnie, ale
        nieprawidłowe dane, <code>401</code>/<code>403</code> uwierzytelnianie i
        autoryzacja, <code>404</code> nieznany zasób, <code>405</code> metoda
        niedozwolona, <code>409</code> konflikt z bieżącym stanem,{" "}
        <code>415</code> nieobsługiwany typ zawartości, <code>500</code>{" "}
        nieoczekiwany błąd serwera (z ogólnym komunikatem).
      </p>
    ),
  },
  {
    question: "Czy Route Handlery są chronione przed CSRF jak Server Actions?",
    answer: (
      <p>
        Nie. Server Actions sprawdzają nagłówek <code>Origin</code> względem
        hosta; Route Handlery nie. Wymagaj typu zawartości spoza „prostych” albo
        nagłówka z tokenem i nie polegaj tylko na cookies w endpointach
        zmieniających stan.
      </p>
    ),
  },
  {
    question: "Czy Route Handlery są cache'owane?",
    answer: (
      <p>
        Nie domyślnie, jeśli czytają dane runtime. Przy Cache Components{" "}
        <code>GET</code> podlega regułom stron: może być prerenderowany, jeśli
        nie używa danych runtime ani danych bez cache, albo wywołaj{" "}
        <code>connection()</code> / przeczytaj żądanie, by utrzymać go per
        żądanie. Inne metody nie są nigdy cache&apos;owane.
      </p>
    ),
  },
  {
    question: "Jak odczytać dynamiczne parametry trasy w handlerze?",
    answer: (
      <p>
        Drugi argument to kontekst, którego <code>params</code> jest Promise:{" "}
        <code>await context.params</code>. Otypuj go globalnym pomocnikiem{" "}
        <code>RouteContext&lt;&quot;/api/notes/[id]&quot;&gt;</code>.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Route Handlery",
  summary: "Metody HTTP z NextRequest i NextResponse.",
  basics,
  edgeCases,
  interviewQuestions,
};
