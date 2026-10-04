"use client";

import { useState } from "react";
import { useLocalizedPath } from "@/shared/i18n";
import { RuntimeInfoSchema } from "../runtimeInfoSchema";
import { RuntimeRow } from "./RuntimeRow";
import { RuntimeTable } from "./RuntimeTable";
import styles from "./Runtimes.module.css";

type ProbeResult = {
  handlerRuntime: string;
  handlerDetail: string;
  proxyRuntime: string;
};

async function probe(localize: (path: string) => string): Promise<ProbeResult> {
  const [handlerResponse, proxiedResponse] = await Promise.all([
    fetch("/api/runtimes/info"),
    // The proxy matcher includes this page, so its response carries the header.
    fetch(localize("/advanced-routing/runtimes/demo")),
  ]);
  const handlerBody = RuntimeInfoSchema.parse(await handlerResponse.json());

  return {
    handlerRuntime: handlerBody.runtime,
    handlerDetail: `node ${handlerBody.nodeVersion}, EdgeRuntime global: ${handlerBody.hasEdgeGlobal}`,
    proxyRuntime: proxiedResponse.headers.get("x-demo-runtime") ?? "(header missing)",
  };
}

export function RuntimeProbe() {
  const localize = useLocalizedPath();
  const [result, setResult] = useState<ProbeResult | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  async function runProbe() {
    setFailure(null);
    try {
      setResult(await probe(localize));
    } catch (error) {
      // A failed probe is something the user can act on (retry), so turn it
      // into visible state instead of an unhandled rejection.
      setResult(null);
      setFailure(error instanceof Error ? error.message : "The probe failed.");
    }
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Ask the server where each piece runs</h3>
      <button type="button" className={styles.button} onClick={runProbe}>
        Probe the route handler and the proxy
      </button>
      {failure ? (
        <p role="alert" className={styles.hint}>
          Could not probe the server: {failure}
        </p>
      ) : null}
      {result ? (
        <RuntimeTable>
          <RuntimeRow where="Route Handler (/api/runtimes/info)" runtime={result.handlerRuntime} detail={result.handlerDetail} />
          <RuntimeRow where="proxy.ts (x-demo-runtime header)" runtime={result.proxyRuntime} detail="set on the response by proxy.ts" />
        </RuntimeTable>
      ) : null}
    </section>
  );
}
