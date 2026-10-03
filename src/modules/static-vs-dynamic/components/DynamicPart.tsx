import { headers } from "next/headers";
import { connection } from "next/server";
import styles from "./Rendering.module.css";

const USER_AGENT_PREVIEW_LENGTH = 48;

// Runtime data (the request headers) and a per-request timestamp: neither
// can be known at build time, so this renders on every request.
export async function DynamicPart() {
  await connection();
  const requestHeaders = await headers();
  const userAgent = requestHeaders.get("user-agent") ?? "unknown";

  return (
    <ul className={styles.facts}>
      <li>rendered at: {new Date().toISOString()}</li>
      <li>
        your user-agent: {userAgent.slice(0, USER_AGENT_PREVIEW_LENGTH)}
        {userAgent.length > USER_AGENT_PREVIEW_LENGTH ? "…" : ""}
      </li>
    </ul>
  );
}
