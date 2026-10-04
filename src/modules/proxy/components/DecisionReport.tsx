import { headers } from "next/headers";
import styles from "./Proxy.module.css";

// Reads a request header the proxy added: proof the proxy ran before this
// page rendered, even for a rewritten URL.
export async function DecisionReport() {
  const requestHeaders = await headers();

  return (
    <p className={styles.readout} role="status">
      proxy decision seen by this page:{" "}
      {requestHeaders.get("x-demo-proxy-decision") ?? "(no proxy ran for this request)"}
    </p>
  );
}
