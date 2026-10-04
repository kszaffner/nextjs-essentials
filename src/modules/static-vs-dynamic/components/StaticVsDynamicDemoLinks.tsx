import Link from "next/link";
import styles from "./Rendering.module.css";

const demoBase = "/rendering/static-vs-dynamic/demo";

export function StaticVsDynamicDemoLinks() {
  return (
    <nav aria-label="Static vs dynamic demo">
      <ul className={styles.facts}>
        <li>
          <Link href={`${demoBase}/static`}>A fully static route</Link>
        </li>
        <li>
          <Link href={`${demoBase}/mixed`}>A static shell with a dynamic part</Link>
        </li>
      </ul>
    </nav>
  );
}
