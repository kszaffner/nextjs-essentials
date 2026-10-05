import { LocalizedLink, type Locale } from "@/shared/i18n";
import { getStaticVsDynamicText } from "../text";
import styles from "./Rendering.module.css";

const demoBase = "/rendering/static-vs-dynamic/demo";

export function StaticVsDynamicDemoLinks({ locale }: { locale: Locale }) {
  const text = getStaticVsDynamicText(locale);

  return (
    <nav aria-label={text.navigationLabel}>
      <ul className={styles.facts}>
        <li>
          <LocalizedLink href={`${demoBase}/static`}>{text.links.static}</LocalizedLink>
        </li>
        <li>
          <LocalizedLink href={`${demoBase}/mixed`}>{text.links.mixed}</LocalizedLink>
        </li>
      </ul>
    </nav>
  );
}
