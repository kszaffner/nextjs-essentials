import { connection } from "next/server";
import { getServerFacts } from "../server/serverFacts";
import styles from "./Composition.module.css";

// A Server Component rendered per request. It lives *inside* a Client
// Component through the `children` prop, without being imported by it.
export async function ServerFactsPanel() {
  await connection();
  const facts = getServerFacts();

  return (
    <div>
      <ul className={styles.facts}>
        <li>process.version: {facts.nodeVersion}</li>
        <li>rendered on the server at: {facts.renderedAt}</li>
        <li>server-only module marker: {facts.marker}</li>
      </ul>
      <p className={styles.hint}>
        Toggle the panel: the timestamp stays the same, because this was
        rendered once on the server and only shown or hidden on the client.
      </p>
    </div>
  );
}
