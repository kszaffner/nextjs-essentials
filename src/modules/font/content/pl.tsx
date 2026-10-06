import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/optimization/font/demo";

const basics = (
  <>
    <p>
      <code>next/font</code> ładuje fonty webowe bez żądania do usługi fontów i,
      z założenia, bez skoku układu. Dla fontów Google pliki są pobierane{" "}
      <strong>w czasie builda</strong> i serwowane z twojej domeny; dla własnych
      plików robi to samo <code>next/font/local</code>.
    </p>
    <CodeBlock code={`import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

<div className={lora.variable}>…</div>      // potem: font-family: var(--font-lora)`} />
    <p>
      Główny layout już ładuje w ten sposób Geist.{" "}
      <LocalizedLink href={demoHref}>Demo</LocalizedLink> dodaje Lorę na tej
      jednej stronie, a przycisk wypisuje kroje, które zna przeglądarka.
      Zaobserwowane na buildzie produkcyjnym:
    </p>
    <ul>
      <li>
        HTML <strong>nie zawiera żadnego odwołania do Google</strong>; fonty to
        pliki <code>/_next/static/media/…woff2</code> z tej witryny, serwowane z{" "}
        <code>Cache-Control: public, max-age=31536000, immutable</code>;
      </li>
      <li>
        CSS ma reguły <code>@font-face</code> z <code>font-display: swap</code>,
        zakresem wag zmiennych (<code>100 900</code> dla Geista) i{" "}
        <code>unicode-range</code> dla każdego podzbioru;
      </li>
      <li>
        generowany jest dopasowany rozmiarem fallback: <code>Geist Fallback</code>{" "}
        używa <code>local(Arial)</code> z <code>size-adjust: 104.76%</code> oraz
        pasującymi nadpisaniami ascent, descent i line-gap, więc tekst nie
        przesuwa się, gdy przychodzi prawdziwy font.
      </li>
    </ul>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Preload działa per strona, przez nagłówek Link.</strong> Fonty są
      ładowane wstępnie nagłówkiem HTTP{" "}
      <code>Link: …; rel=preload; as=&quot;font&quot;</code>, a nie tagiem w
      HTML. Zwykła strona miała dwa (Geist i Geist Mono); demo fontów miało trzy,
      bo Lora jest importowana tylko tam. Font, którego strona nie importuje, nic
      jej nie kosztuje.
    </li>
    <li>
      <strong>Opcje muszą być literałami.</strong> Przekazanie zmiennej psuje
      build: <em>&quot;Font loader values must be explicitly written
      literals.&quot;</em> Loader jest analizowany w czasie builda, a nie
      uruchamiany.
    </li>
    <li>
      <strong>Loadery mieszkają na górze modułu.</strong> Wywołanie{" "}
      <code>Lora(…)</code> wewnątrz komponentu kończy się błędem{" "}
      <em>&quot;Font loaders must be called and assigned to a const in the module
      scope.&quot;</em> Zdefiniuj go raz i importuj wynik.
    </li>
    <li>
      <strong>Podzbiory decydują, co jest pobierane i ładowane wstępnie.</strong>{" "}
      Zadeklaruj potrzebne podzbiory (<code>latin</code>); CSS nadal wymienia
      pozostałe z <code>unicode-range</code>, więc przeglądarka pobierze taki
      dopiero wtedy, gdy potrzebuje go jakiś znak.
    </li>
    <li>
      <strong>Fonty zmienne nie potrzebują wagi.</strong> Font zmienny pokrywa
      zakres (<code>400 700</code> dla Lory), więc jeden plik obsługuje każdą
      wagę; fonty statyczne wymagają wypisania każdego <code>weight</code>, a
      każda waga to osobny plik.
    </li>
    <li>
      <strong>swap najpierw pokazuje fallback.</strong> Przy{" "}
      <code>font-display: swap</code> tekst pojawia się od razu w foncie
      zastępczym i podmienia się po załadowaniu fontu; dopasowany rozmiarem
      fallback sprawia, że podmiana nie przesuwa układu, ale kształt liter nadal
      się zmienia.
    </li>
    <li>
      <strong>Zawężaj font do miejsca użycia.</strong> Nakładaj{" "}
      <code>variable</code> na najmniejszy wrapper, który go potrzebuje, tak jak
      robi to demo, a nie na <code>&lt;html&gt;</code>, chyba że używa go każda
      strona.
    </li>
    <li>
      <strong>Self-hosting to wybór prywatności i niezawodności.</strong>{" "}
      Odwiedzający nie wysyłają żadnych żądań do stron trzecich, a fonty
      cache&apos;ują się jak każdy inny zasób statyczny.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Czym next/font różni się od <link> do Google Fonts?",
    answer: (
      <p>
        Pobiera pliki fontów w czasie builda i hostuje je samodzielnie, więc
        odwiedzający nie wysyłają żądań do Google, pliki cache&apos;ują się jako
        niezmienne zasoby statyczne, a do tego generuje dopasowany rozmiarem font
        zastępczy, który zapobiega skokowi układu.
      </p>
    ),
  },
  {
    question: "Jak next/font unika skoku układu?",
    answer: (
      <p>
        Tworzy zastępczy <code>@font-face</code> (na przykład{" "}
        <code>Geist Fallback</code> zbudowany na foncie systemowym) z{" "}
        <code>size-adjust</code> i nadpisaniami ascent, descent i line-gap
        dopasowanymi do prawdziwego fontu, więc tekst zajmuje tyle samo miejsca
        przed podmianą i po niej.
      </p>
    ),
  },
  {
    question: "Dlaczego opcje loadera fontów muszą być literałami, a wywołanie na poziomie modułu?",
    answer: (
      <p>
        Next.js wykonuje loader w czasie builda, żeby pobrać i wyciąć podzbiory
        fontu, więc nie może uruchamiać twojego kodu ani zależeć od wartości z
        runtime. Naruszenia to błędy builda z jednoznacznymi komunikatami.
      </p>
    ),
  },
  {
    question: "Jak fonty są ładowane wstępnie?",
    answer: (
      <p>
        Next.js dodaje nagłówek HTTP <code>Link</code> z preload dla zadeklarowanych
        podzbiorów każdego fontu importowanego przez stronę. Font importowany
        tylko na jednej stronie jest ładowany wstępnie tylko tam.
      </p>
    ),
  },
  {
    question: "Czym różni się next/font/google od next/font/local?",
    answer: (
      <p>
        Oba hostują samodzielnie i generują metryki fallbacku. Google pobiera
        pliki z Google Fonts w czasie builda; local bierze pliki fontów z twojego
        repozytorium (ścieżka <code>src</code> względem pliku).
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "next/font",
  summary: "Self-hosting fontów i unikanie skoku układu.",
  basics,
  edgeCases,
  interviewQuestions,
};
