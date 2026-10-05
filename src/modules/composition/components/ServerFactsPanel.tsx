import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getServerFacts } from "../server/serverFacts";
import { getCompositionText } from "../text";
import styles from "./Composition.module.css";

// A Server Component rendered per request. It lives *inside* a Client
// Component through the `children` prop, without being imported by it.
export async function ServerFactsPanel({ locale }: { locale: Locale }) {
  await connection();
  const facts = getServerFacts();
  const text = getCompositionText(locale);

  return (
    <div>
      <ul className={styles.facts}>
        <li>
          {text.facts.nodeVersion}: {facts.nodeVersion}
        </li>
        <li>
          {text.facts.renderedAt}: {facts.renderedAt}
        </li>
        <li>
          {text.facts.marker}: {facts.marker}
        </li>
      </ul>
      <p className={styles.hint}>{text.hint}</p>
    </div>
  );
}
