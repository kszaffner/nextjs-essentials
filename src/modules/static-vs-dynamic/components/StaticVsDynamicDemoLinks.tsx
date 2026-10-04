import styles from "./Rendering.module.css";
import { LocalizedLink } from "@/shared/i18n";

const demoBase = "/rendering/static-vs-dynamic/demo";

export function StaticVsDynamicDemoLinks() {
  return (
    <nav aria-label="Static vs dynamic demo">
      <ul className={styles.facts}>
        <li>
          <LocalizedLink href={`${demoBase}/static`}>A fully static route</LocalizedLink>
        </li>
        <li>
          <LocalizedLink href={`${demoBase}/mixed`}>A static shell with a dynamic part</LocalizedLink>
        </li>
      </ul>
    </nav>
  );
}
