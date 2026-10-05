import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/advanced-routing/proxy/demo";

export const basics = (
  <>
    <p>
      <code>proxy.ts</code> (w korzeniu <code>src</code>, obok <code>app</code>)
      działa <strong>zanim żądanie zostanie dokończone</strong>: przed cache i
      przed renderem jakiejkolwiek trasy. Dla każdego żądania może kontynuować,
      przepisać (rewrite), przekierować, zmienić nagłówki lub cookies albo
      odpowiedzieć bezpośrednio.
    </p>
    <CodeBlock code={`export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL("/target", request.url));
}

export const config = { matcher: ["/demo/:path*"] };`} />
    <p>
      Cztery rzeczy, które robi <LocalizedLink href={demoHref}>demo</LocalizedLink>,
      zaobserwowane przez <code>curl -i</code> na buildzie produkcyjnym:
    </p>
    <ul>
      <li>
        <strong>Redirect:</strong> <code>/old</code> odpowiada{" "}
        <code>307 Temporary Redirect</code> z nagłówkiem <code>Location</code>.
      </li>
      <li>
        <strong>Rewrite:</strong> <code>/alias</code> odpowiada <code>200</code>{" "}
        z zawartością <code>/target</code>; URL się nie zmienia.
      </li>
      <li>
        <strong>Personalizacja:</strong> <code>/personalized</code> jest
        przepisywane na wariant A lub B. Pierwsza wizyta dostaje losowy wariant i
        cookie <code>demo-variant</code>; wizyta wysyłająca cookie zachowuje
        wariant i nie dostaje nowego cookie.
      </li>
      <li>
        <strong>Odpowiedź bezpośrednia:</strong> <code>/blocked</code> odpowiada{" "}
        <code>403</code> z proxy; żadna trasa się nie wykonuje.
      </li>
    </ul>
    <p>
      Decyzje żyją w czystej funkcji (<code>decideProxyAction</code>), którą{" "}
      <code>proxy.ts</code> zamienia w odpowiedź, więc są testowane jednostkowo
      bez żądania.
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>Działa przed cache.</strong> Prerenderowana strona serwowana jako
      trafienie w cache (<code>x-nextjs-cache: HIT</code>) nadal niosła nagłówek{" "}
      <code>x-demo-proxy: ran</code> z proxy: proxy widzi każde dopasowane
      żądanie, nawet gdy sama strona jest statyczna.
    </li>
    <li>
      <strong>Bez matchera działa na wszystkim.</strong> Także na{" "}
      <code>_next/static</code>, obrazach i <code>public/</code>. Dopasuj dokładnie
      potrzebne ścieżki albo wyklucz zasoby negatywnym wzorcem.
    </li>
    <li>
      <strong>Nagłówki żądania i odpowiedzi to co innego.</strong> Demo ustawia
      nagłówek <em>żądania</em> (<code>x-demo-proxy-decision</code>) przez{" "}
      <code>NextResponse.next({"{ request: { headers } }"})</code>, by Server
      Component mógł go odczytać, oraz nagłówek <em>odpowiedzi</em> (
      <code>x-demo-proxy</code>), który widzi tylko przeglądarka. Informacje do
      aplikacji przekazuj przez nagłówki żądania, cookies, rewrite&apos;y lub
      URL; nie dziel z nią modułów ani globalnych zmiennych.
    </li>
    <li>
      <strong>Nigdy nie ufaj cookie.</strong> Podmienione{" "}
      <code>demo-variant=zzz</code> zostało zignorowane i zastąpione poprawnym
      przypisaniem, bo wartość jest najpierw parsowana.
    </li>
    <li>
      <strong>Matcher decyduje też o pokryciu Server Actions.</strong> Server
      Actions to POST-y na trasę, w której są użyte, więc ścieżka wykluczona z
      matchera pomija proxy także dla swoich akcji. Uwierzytelniaj wewnątrz
      każdej akcji zamiast polegać tylko na proxy.
    </li>
    <li>
      <strong>Trzymaj je szybkie i małe.</strong> Stoi przed każdym dopasowanym
      żądaniem: bez zapytań do bazy ani pobierania całej treści. Ciężka logika
      należy do trasy.
    </li>
    <li>
      <strong>Działa na Node.js, a nazwa się zmieniła.</strong> Stary{" "}
      <code>middleware.ts</code> nadal działa z ostrzeżeniem o wycofaniu, ale
      działał na runtime Edge (zob. temat o runtime&apos;ach). Dokumentacja
      zaleca sięganie po proxy w ostateczności.
    </li>
    <li>
      <strong>Kolejność ma znaczenie.</strong> <code>headers</code> i{" "}
      <code>redirects</code> z <code>next.config</code> idą pierwsze, potem proxy,
      potem rewrite&apos;y <code>beforeFiles</code>, trasy systemu plików i
      późniejsze rewrite&apos;y.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym jest proxy.ts i gdzie leży w przepływie żądania?",
    answer: (
      <p>
        Plik w korzeniu <code>src</code>, którego funkcja <code>proxy</code>{" "}
        działa przed cache i przed renderem tras. Może przekierować, przepisać,
        ustawić nagłówki i cookies albo sama odpowiedzieć. Po kolei: nagłówki i
        przekierowania z configu, potem proxy, potem rewrite&apos;y i trasy
        systemu plików.
      </p>
    ),
  },
  {
    question: "Czym różni się redirect od rewrite?",
    answer: (
      <p>
        Redirect odsyła przeglądarkę pod inny URL (<code>307</code>/
        <code>308</code>, a pasek adresu się zmienia). Rewrite serwuje zawartość
        innej trasy pod oryginalnym URL; przeglądarka zmiany nie widzi.
      </p>
    ),
  },
  {
    question: "Jak zrobiłbyś z jego pomocą testy A/B?",
    answer: (
      <p>
        Przy pierwszej wizycie wybierz wariant i ustaw cookie; przepisz na trasę
        wariantu. Przy kolejnych odczytaj i zwaliduj cookie, by użytkownik
        zachował ten sam wariant. Oba warianty mogą pozostać stronami
        statycznymi.
      </p>
    ),
  },
  {
    question: "Dlaczego warto ustawić matcher?",
    answer: (
      <p>
        Bez niego proxy działa na każdym żądaniu, także na zasobach statycznych i
        obrazach, marnując pracę i ryzykując logikę przeznaczoną tylko dla
        stron.
      </p>
    ),
  },
  {
    question: "Czy można polegać na proxy przy autoryzacji?",
    answer: (
      <p>
        Nie samemu. Zmiana matchera może po cichu usunąć pokrycie, a Server
        Actions to POST-y na trasę, która ich używa. Używaj go do tanich,
        optymistycznych sprawdzeń i przekierowań, a uwierzytelnianie i
        autoryzację weryfikuj ponownie wewnątrz każdej Server Action i Route
        Handlera.
      </p>
    ),
  },
  {
    question: "Czym proxy.ts różni się od starego middleware.ts?",
    answer: (
      <p>
        To przemianowana, uściślona konwencja: <code>middleware.ts</code> jest
        wycofywany (codemod go migruje). Proxy działa na Node.js i nie przyjmuje
        opcji <code>runtime</code>; <code>middleware.ts</code> działał na
        runtime Edge.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Proxy",
  summary: "Rewrite'y, przekierowania i personalizacja w proxy.ts.",
  basics,
  edgeCases,
  interviewQuestions,
};
