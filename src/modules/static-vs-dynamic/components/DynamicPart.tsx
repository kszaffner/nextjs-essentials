import { headers } from "next/headers";
import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { getStaticVsDynamicText } from "../text";
import styles from "./Rendering.module.css";

const USER_AGENT_PREVIEW_LENGTH = 48;

// Runtime data (the request headers) and a per-request timestamp: neither
// can be known at build time, so this renders on every request.
export async function DynamicPart({ locale }: { locale: Locale }) {
  await connection();
  const requestHeaders = await headers();
  const text = getStaticVsDynamicText(locale).dynamicPart;
  const userAgent = requestHeaders.get("user-agent") ?? text.unknown;

  return (
    <ul className={styles.facts}>
      <li>
        {text.renderedAt}: {new Date().toISOString()}
      </li>
      <li>
        {text.userAgent}: {userAgent.slice(0, USER_AGENT_PREVIEW_LENGTH)}
        {userAgent.length > USER_AGENT_PREVIEW_LENGTH ? "…" : ""}
      </li>
    </ul>
  );
}
