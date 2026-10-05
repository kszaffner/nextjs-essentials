import { headers } from "next/headers";
import type { Locale } from "@/shared/i18n";
import { getProxyText } from "../text";
import styles from "./Proxy.module.css";

// Reads a request header the proxy added: proof the proxy ran before this
// page rendered, even for a rewritten URL.
export async function DecisionReport({ locale }: { locale: Locale }) {
  const requestHeaders = await headers();
  const text = getProxyText(locale).report;

  return (
    <p className={styles.readout} role="status">
      {text.prefix} {requestHeaders.get("x-demo-proxy-decision") ?? text.none}
    </p>
  );
}
