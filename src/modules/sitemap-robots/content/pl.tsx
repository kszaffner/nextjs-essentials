import type { InterviewQuestion, TopicContent } from "@/shared/topic-page";
import { LocalizedLink } from "@/shared/i18n";
import { CodeBlock } from "@/shared/code-block";

const demoHref = "/metadata/sitemap-robots/demo";

export const basics = (
  <>
    <p>
      <code>sitemap.ts</code> i <code>robots.ts</code> w <code>app/</code> to
      specjalne Route Handlery, które produkują <code>/sitemap.xml</code> i{" "}
      <code>/robots.txt</code>. Zwracają typowane obiekty (
      <code>MetadataRoute.Sitemap</code>, <code>MetadataRoute.Robots</code>), a
      Next.js je serializuje.
    </p>
    <CodeBlock code={`export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://example.com/", priority: 1 }];
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://example.com/sitemap.xml",
  };
}`} />
    <p>
      Ta witryna generuje oba z katalogu tematów: sitemap wymienia stronę główną
      i każdy temat w obu językach (76 URL-i), nigdy strony demo ani API, a
      robots.txt trzyma crawlery z dala od <code>/api/</code> i wskazuje
      sitemap. Otwórz <LocalizedLink href={demoHref}>demo</LocalizedLink>, by
      pobrać prawdziwe pliki. Zaobserwowane: <code>sitemap.xml</code> jest
      serwowany jako <code>application/xml</code>, <code>robots.txt</code> jako{" "}
      <code>text/plain</code>, a oba są prerenderowane w czasie builda
      (oznaczone <code>○</code>).
    </p>
  </>
);

export const edgeCases = (
  <ul>
    <li>
      <strong>
        <code>lastModified: new Date()</code> kłamie i psuje cache.
      </strong>{" "}
      Nie łamie builda. Za to <code>/sitemap.xml</code> stał się dynamiczny (
      <code>ƒ</code>) i zgłaszał nowe <em>teraz</em> przy każdym żądaniu (dwa
      żądania w odstępie dwóch sekund zwróciły dwie różne wartości), mówiąc
      crawlerom, że każda strona zmieniła się przed chwilą. Pomiń pole, chyba że
      znasz prawdziwą datę.
    </li>
    <li>
      <strong>Bezwzględne URL-e są wpisane w czasie builda.</strong> Sitemap i
      linia <code>Sitemap:</code> pochodzą z <code>getSiteUrl()</code>, które
      czyta <code>SITE_ORIGIN</code>. Zbudowane bez niej, oba wymieniały{" "}
      <code>localhost:3000</code> nawet przy zmiennej ustawionej w runtime.
    </li>
    <li>
      <strong>Domyślnie w cache.</strong> Oba pliki to specjalne Route Handlery,
      cache&apos;owane, dopóki nie czytają danych czasu żądania ani dynamicznej
      konfiguracji, więc nowy temat pojawia się w sitemap po następnym buildzie,
      nie na żywo.
    </li>
    <li>
      <strong>robots.txt to prośba, nie zabezpieczenie.</strong> Uprzejmy
      crawler jej słucha; nic nie powstrzyma nikogo przed pobraniem
      zabronionego URL-a, a plik publikuje wymienione ścieżki. Chroń prywatne
      strony uwierzytelnianiem, a metadanych <code>noindex</code> użyj, by
      wykluczyć stronę z wyników.
    </li>
    <li>
      <strong>Zabroniona strona nadal może zostać zaindeksowana.</strong>{" "}
      Zablokowanie URL-a w robots.txt zatrzymuje crawlowanie, więc crawler nigdy
      nie zobaczy <code>noindex</code> na nim. By usunąć stronę, pozwól na
      crawlowanie i oznacz ją <code>noindex</code>.
    </li>
    <li>
      <strong>Wymieniaj tylko kanoniczne, indeksowalne URL-e.</strong> Strony
      demo, trasy API i przekierowania tu nie należą. Protokół sitemap dopuszcza
      najwyżej 50 000 URL-i na plik; większe witryny dzielą go przez{" "}
      <code>generateSitemaps</code>.
    </li>
    <li>
      <strong>Trzymaj logikę testowalną.</strong> Buildery to czyste funkcje
      bazowego URL-a i listy, testowane jednostkowo; pliki tras tylko je
      komponują, więc oba moduły pozostają niezależne.
    </li>
  </ul>
);

export const interviewQuestions: readonly InterviewQuestion[] = [
  {
    question: "Jak dodać sitemap i robots.txt w App Routerze?",
    answer: (
      <p>
        Dodaj <code>sitemap.ts</code> i <code>robots.ts</code> do <code>app/</code>{" "}
        zwracające <code>MetadataRoute.Sitemap</code> i{" "}
        <code>MetadataRoute.Robots</code>, albo statyczne pliki{" "}
        <code>sitemap.xml</code> i <code>robots.txt</code>. Next.js serwuje je
        pod głównymi URL-ami.
      </p>
    ),
  },
  {
    question: "Czy te pliki są cache'owane?",
    answer: (
      <p>
        Tak, domyślnie: to specjalne Route Handlery prerenderowane w czasie
        builda, chyba że używają API czasu żądania lub dynamicznej konfiguracji.
        Dlatego sitemap nie powinien zawierać wartości takich jak{" "}
        <code>new Date()</code>.
      </p>
    ),
  },
  {
    question: "Czy Disallow w robots.txt trzyma stronę poza wynikami wyszukiwania?",
    answer: (
      <p>
        Nie. Zatrzymuje crawlowanie, nie indeksowanie: URL może się nadal pojawić,
        jeśli linkują do niego inne strony, a crawler nie przeczyta{" "}
        <code>noindex</code> na stronie, której nie może pobrać. Użyj{" "}
        <code>noindex</code> i pozwól na crawlowanie.
      </p>
    ),
  },
  {
    question: "Dlaczego origin witryny musi być znany w czasie builda?",
    answer: (
      <p>
        Sitemap, robots, linki canonical i URL-e Open Graph są prerenderowane z
        bezwzględnymi URL-ami. Zbudowane bez originu, niosą host zastępczy, nawet
        jeśli serwer później ma zmienną.
      </p>
    ),
  },
  {
    question: "Jak obsłużyć witrynę z ponad 50 000 URL-i?",
    answer: (
      <p>
        Protokół sitemap dopuszcza 50 000 URL-i na plik, więc podziel go na kilka
        sitemap przez <code>generateSitemaps</code>, który produkuje numerowany
        plik na porcję, i odwołaj się do nich z robots.txt lub indeksu sitemap.
      </p>
    ),
  },
];

export const content: TopicContent = {
  title: "Sitemap i robots",
  summary: "sitemap.ts i robots.ts.",
  basics,
  edgeCases,
  interviewQuestions,
};
