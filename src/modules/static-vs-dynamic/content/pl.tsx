import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";

const demoBase = "/rendering/static-vs-dynamic/demo";

const basics = (
  <>
    <p>
      Przy Cache Components (włączonych w tym projekcie) Next.js prerenderuje
      każdą trasę w czasie builda do <strong>statycznej powłoki</strong> (static
      shell). To, czy fragment UI trafi do powłoki, zależy od tego, czego
      używa:
    </p>
    <ul>
      <li>
        <strong>Wartości przewidywalne</strong> (literały, czyste obliczenia,
        importy modułów, <code>fs.readFileSync</code>) kończą się w czasie
        builda i automatycznie wchodzą do powłoki.
      </li>
      <li>
        Wyniki <strong><code>&quot;use cache&quot;</code></strong> są
        cache&apos;owane i trafiają do powłoki, gdy ich czas życia jest
        wystarczająco długi.
      </li>
      <li>
        <strong>Dane runtime</strong> (<code>cookies()</code>,{" "}
        <code>headers()</code>, <code>searchParams</code>, params bez próbek),
        nie-cache&apos;owany <code>fetch()</code> i <code>connection()</code>{" "}
        nie mogą być znane w czasie builda. Muszą stać za{" "}
        <code>&lt;Suspense&gt;</code>: fallback trafia do powłoki, a treść
        streamuje się przy każdym żądaniu.
      </li>
    </ul>
    <p>
      „Statyczna” i „dynamiczna” nie jest więc już cechą całej trasy; trasa to
      statyczna powłoka z opcjonalnymi dynamicznymi dziurami. Wynik widać w
      wyjściu builda: <code>○ (Static)</code> to prerenderowana treść
      statyczna, <code>◐ (Partial Prerender)</code> to prerenderowany statyczny
      HTML z dynamiczną treścią streamowaną z serwera.
    </p>
    <p>
      Porównaj <LocalizedLink href={`${demoBase}/static`}>trasę statyczną</LocalizedLink> z{" "}
      <LocalizedLink href={`${demoBase}/mixed`}>trasą z częścią dynamiczną</LocalizedLink>. Na
      buildzie produkcyjnym ich odpowiedzi się różnią: statyczna to trafienie w
      cache serwowane z <code>Cache-Control: s-maxage=31536000</code>; mieszana
      niesie <code>x-nextjs-postponed: 1</code>, jest streamowana we fragmentach, a
      jej HTML zawiera już fallback Suspense. Panel „Pod maską” w demie pobiera
      obie i pokazuje te nagłówki na żywo.
    </p>
    <p>
      <em>Kontrast (poprzedni model):</em> bez Cache Components wywołanie{" "}
      <code>cookies()</code> lub odczyt <code>searchParams</code> gdziekolwiek
      po cichu czyniły <em>całą trasę</em> dynamiczną (oznaczoną ƒ), a{" "}
      <code>export const dynamic = &quot;force-dynamic&quot;</code> ją
      wymuszało.
    </p>
  </>
);

const edgeCases = (
  <ul>
    <li>
      <strong>Dane runtime poza Suspense wywalają build.</strong> Odczyt{" "}
      <code>await cookies()</code> na stronie bez granicy daje:{" "}
      <em>
        &quot;Next.js encountered uncached or runtime data during
        prerendering.&quot;
      </em>{" "}
      Błąd wymienia jako wyzwalacze <code>fetch(...)</code>,{" "}
      <code>cookies()</code>, <code>headers()</code>, <code>params</code>,{" "}
      <code>searchParams</code> i <code>connection()</code>.
    </li>
    <li>
      <strong>Czas i losowość to też dane runtime.</strong>{" "}
      <code>new Date()</code> lub <code>Math.random()</code> w Server
      Componencie kończy się błędem <em>&quot;encountered the unstable value
      `new Date()` while prerendering&quot;</em>, bo wartość zostałaby
      zamrożona w czasie builda. Użyj <code>connection()</code> wewnątrz
      Suspense dla wartości per żądanie albo <code>&quot;use cache&quot;</code>,
      by współdzielić jedną.
    </li>
    <li>
      <strong>
        <code>force-dynamic</code> jest odrzucane.
      </strong>{" "}
      <code>export const dynamic = &quot;force-dynamic&quot;</code> kończy się
      błędem{" "}
      <em>
        &quot;Route segment config &quot;dynamic&quot; is not compatible with
        `nextConfig.cacheComponents`. Please remove it.&quot;
      </em>{" "}
      Dynamikę wyrażaj, umieszczając dostęp do runtime za Suspense.
    </li>
    <li>
      <strong>Umieszczaj Suspense jak najgłębiej.</strong> Granica wokół całej
      strony sprawia, że powłoka to tylko fallback; granica wokół samego
      dynamicznego widżetu zostawia resztę strony statyczną i natychmiastową.
    </li>
    <li>
      <strong>Statyczna powłoka nie zawsze jest serwowana z CDN.</strong> Na
      Vercel powłoka pochodzi z CDN. Przy <code>next start</code> trasa
      mieszana nadal odpowiada z <code>no-store</code> i streamuje część
      dynamiczną, więc sprawdzaj nagłówki w środowisku, na które wdrażasz.
    </li>
    <li>
      <strong>Oceniaj renderowanie po <code>next build</code>, nie <code>next dev</code>.</strong>{" "}
      Symbole ○ / ◐ i nagłówki odpowiedzi opisują build produkcyjny; serwer dev
      renderuje na żądanie.
    </li>
  </ul>
);

const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak Next.js decyduje, czy trasa jest statyczna czy dynamiczna?",
    answer: (
      <p>
        Przy Cache Components prerenderuje całe drzewo i patrzy, czego używa
        każdy fragment. Wartości przewidywalne i wyniki z cache trafiają do
        statycznej powłoki; dane runtime, nie-cache&apos;owane fetche i{" "}
        <code>connection()</code> muszą stać za Suspense i renderują się przy
        każdym żądaniu. W poprzednim modelu każde dynamiczne API przełączało
        całą trasę na renderowanie dynamiczne.
      </p>
    ),
  },
  {
    question: "Co znaczą ○ i ◐ w wyjściu builda?",
    answer: (
      <p>
        <code>○ (Static)</code>: prerenderowana treść statyczna.{" "}
        <code>◐ (Partial Prerender)</code>: prerenderowany statyczny HTML, z
        dynamiczną treścią streamowaną z serwera, wypełniającą dziury Suspense.
      </p>
    ),
  },
  {
    question: "Co się stanie, gdy odczytasz cookies() na stronie bez granicy Suspense?",
    answer: (
      <p>
        Build się nie powiedzie: dane runtime odczytane poza{" "}
        <code>&lt;Suspense&gt;</code> uniemożliwiają wytworzenie statycznej
        powłoki. Opakuj komponent, który je czyta, w Suspense z fallbackiem (lub
        zcache&apos;uj dostęp).
      </p>
    ),
  },
  {
    question: "Dlaczego new Date() psuje prerendering i jak to naprawić?",
    answer: (
      <p>
        W czasie builda zostałoby obliczone raz i wpisane w powłokę, więc każdy
        odwiedzający widziałby czas builda. Next.js to odrzuca. Odczytaj czas po{" "}
        <code>connection()</code> wewnątrz Suspense, by mieć wartość per żądanie,
        albo opakuj w <code>&quot;use cache&quot;</code>, by świadomie
        współdzielić jedną.
      </p>
    ),
  },
  {
    question: "Co zastępuje export const dynamic = \"force-dynamic\"?",
    answer: (
      <p>
        Nic nie jest wymuszane na poziomie trasy: konfiguracja jest odrzucana
        przy Cache Components. Konkretną część dynamiczną oznaczasz, sięgając po
        dane runtime (lub <code>connection()</code>) wewnątrz granicy Suspense, a
        reszta zostaje w statycznej powłoce.
      </p>
    ),
  },
  {
    question: "Jak sprawdzić, co Next.js faktycznie wytworzył?",
    answer: (
      <p>
        Przeczytać tabelę tras z <code>next build</code> (○ vs ◐) i obejrzeć
        nagłówki odpowiedzi na buildzie produkcyjnym: trasa statyczna to
        trafienie w cache z długim <code>s-maxage</code>, a częściowo
        prerenderowana niesie <code>x-nextjs-postponed</code> i streamuje.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Renderowanie statyczne i dynamiczne",
  summary: "Kiedy Next.js prerenderuje trasę, a kiedy renderuje ją przy każdym żądaniu.",
  basics,
  edgeCases,
  interviewQuestions,
};
