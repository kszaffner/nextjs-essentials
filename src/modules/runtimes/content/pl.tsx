import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/advanced-routing/runtimes/demo";

export const basics = (
  <>
    <p>
      Next.js ma dwa runtime&apos;y serwerowe. <strong>Runtime Node.js</strong>{" "}
      jest domyślny: wszystkie API Node, używany do renderowania.{" "}
      <strong>Runtime Edge</strong> to mniejsza piaskownica z ograniczonym
      zestawem webowych API; jest teraz wycofywany. Next.js mówi, który działa,
      przez <code>process.env.NEXT_RUNTIME</code>.
    </p>
    <p>
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> pyta trzy elementy tej
      aplikacji, gdzie działają. Na buildzie produkcyjnym każda odpowiedź to{" "}
      <code>nodejs</code> (Node v22), a globalnej zmiennej{" "}
      <code>EdgeRuntime</code>, którą definiuje tylko piaskownica Edge, nie było:
    </p>
    <ul>
      <li>render Server Component,</li>
      <li>
        Route Handler (<code>/api/runtimes/info</code>),
      </li>
      <li>
        <code>proxy.ts</code>, przez nagłówek odpowiedzi, który ustawia.
      </li>
    </ul>
    <table>
      <thead>
        <tr>
          <th scope="col">Kod</th>
          <th scope="col">Runtime tutaj</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Server Components, Server Actions, Route Handlery</td>
          <td>Node.js</td>
        </tr>
        <tr>
          <td>
            <code>proxy.ts</code>
          </td>
          <td>Zawsze Node.js</td>
        </tr>
        <tr>
          <td>
            dawny <code>middleware.ts</code>
          </td>
          <td>Edge (wycofywana nazwa pliku)</td>
        </tr>
      </tbody>
    </table>
    <CodeBlock title="app/api/runtimes/info/route.ts" code={`
export async function GET() {
  return Response.json({
    // Tutaj "nodejs"; "edge" tylko wewnątrz (wycofywanej) piaskownicy Edge.
    runtime: process.env.NEXT_RUNTIME,
    edgeGlobalPresent: typeof EdgeRuntime !== "undefined",
  });
}
`} />
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>export const runtime = &quot;edge&quot;</code> się nie buduje.
      </strong>{" "}
      Na stronie lub w Route Handlerze z Cache Components kończy się błędem{" "}
      <em>
        &quot;Route segment config &quot;runtime&quot; is not compatible with
        `nextConfig.cacheComponents`. Please remove it.&quot;
      </em>{" "}
      Usuń eksport; Node.js jest domyślny.
    </li>
    <li>
      <strong>Proxy odrzuca opcję runtime.</strong> Wyeksportowanie{" "}
      <code>runtime</code> z <code>proxy.ts</code> kończy się błędem{" "}
      <em>
        &quot;Route segment config is not allowed in Proxy file … Proxy always
        runs on Node.js runtime.&quot;
      </em>
    </li>
    <li>
      <strong>Stara nazwa pliku nadal oznacza Edge.</strong>{" "}
      <code>middleware.ts</code> zbudował się z ostrzeżeniem, że konwencja jest
      wycofywana, i działał z <code>NEXT_RUNTIME=edge</code>. Zmiana nazwy na{" "}
      <code>proxy.ts</code> zmienia runtime na Node.js, więc przy migracji
      sprawdź założenia specyficzne dla Edge.
    </li>
    <li>
      <strong>Edge to podzbiór.</strong> Nie obsługuje wszystkich API Node
      (niektóre pakiety przestają działać) i nie obsługuje Incremental Static
      Regeneration. Jeśli zależność wymaga <code>fs</code>, modułów natywnych
      lub sterownika bazy danych, jedyną opcją jest Node.js.
    </li>
    <li>
      <strong>Edge nie jest już drogą do streamingu ani niskich opóźnień.</strong>{" "}
      Oba runtime&apos;y potrafią streamować, a funkcje Node.js platformy (na
      przykład Fluid Compute na Vercel) to zalecany domyślny wybór.
    </li>
    <li>
      <strong>Sprawdzaj runtime, nie zakładaj.</strong> Czytaj{" "}
      <code>process.env.NEXT_RUNTIME</code> (jak w demo), gdy kod musi zachować
      się inaczej.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jakie są dwa runtime'y w Next.js?",
    answer: (
      <p>
        Node.js (domyślny, ze wszystkimi API Node, używany do renderowania) i
        runtime Edge (ograniczona piaskownica webowych API, wycofywany). Który
        działa, poznasz po <code>process.env.NEXT_RUNTIME</code>.
      </p>
    ),
  },
  {
    question: "Którego runtime'u używa proxy.ts?",
    answer: (
      <p>
        Zawsze Node.js: nie przyjmuje opcji <code>runtime</code>, a jej
        wyeksportowanie to błąd builda. Wycofywany <code>middleware.ts</code>{" "}
        działał na runtime Edge.
      </p>
    ),
  },
  {
    question: "Co się stanie, jeśli ustawisz runtime = \"edge\" na trasie?",
    answer: (
      <p>
        Przy Cache Components build się nie powiedzie: konfiguracja segmentu
        trasy <code>runtime</code> nie jest zgodna z <code>cacheComponents</code>.
        Usuń ją i działaj na Node.js.
      </p>
    ),
  },
  {
    question: "Jakie są ograniczenia runtime'u Edge?",
    answer: (
      <p>
        Ograniczona powierzchnia API (to nie pełny Node.js, więc część pakietów
        zawodzi) i brak Incremental Static Regeneration. Jest wycofywany na rzecz
        Node.js.
      </p>
    ),
  },
  {
    question: "Jak bezpiecznie zmigrować middleware.ts?",
    answer: (
      <p>
        Uruchom codemod zmieniający nazwę na <code>proxy.ts</code>, usuń
        eksport <code>runtime</code> i sprawdź ponownie wszystko, co zakładało
        Edge (dostępne API, czas działania). Zachowaj matcher i zweryfikuj
        zachowanie na buildzie produkcyjnym.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Runtime'y",
  summary: "Runtime Edge a runtime Node.js.",
  basics,
  edgeCases,
  interviewQuestions,
};
