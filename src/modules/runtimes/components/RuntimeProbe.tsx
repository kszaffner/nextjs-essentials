"use client";

import { useState } from "react";
import { useLocalizedPath, type Locale } from "@/shared/i18n";
import { getRuntimesText, type RuntimesText } from "../text";
import { RuntimeInfoSchema } from "../runtimeInfoSchema";
import { RuntimeRow } from "./RuntimeRow";
import { RuntimeTable } from "./RuntimeTable";
import styles from "./Runtimes.module.css";

type ProbeResult = {
  handlerRuntime: string;
  handlerDetail: string;
  proxyRuntime: string;
};

async function probe(localize: (path: string) => string, text: RuntimesText): Promise<ProbeResult> {
  const [handlerResponse, proxiedResponse] = await Promise.all([
    fetch("/api/runtimes/info"),
    // The proxy matcher includes this page, so its response carries the header.
    fetch(localize("/advanced-routing/runtimes/demo")),
  ]);
  const handlerBody = RuntimeInfoSchema.parse(await handlerResponse.json());

  return {
    handlerRuntime: handlerBody.runtime,
    handlerDetail: text.detail(handlerBody.nodeVersion, handlerBody.hasEdgeGlobal),
    proxyRuntime: proxiedResponse.headers.get("x-demo-runtime") ?? text.probe.headerMissing,
  };
}

export function RuntimeProbe({ locale }: { locale: Locale }) {
  const localize = useLocalizedPath();
  const text = getRuntimesText(locale);
  const [result, setResult] = useState<ProbeResult | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  async function runProbe() {
    setFailure(null);
    try {
      setResult(await probe(localize, text));
    } catch (error) {
      // A failed probe is something the user can act on (retry), so turn it
      // into visible state instead of an unhandled rejection.
      setResult(null);
      setFailure(error instanceof Error ? error.message : text.probe.failed);
    }
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.probe.title}</h3>
      <button type="button" className={styles.button} onClick={runProbe}>
        {text.probe.button}
      </button>
      {failure ? (
        <p role="alert" className={styles.hint}>
          {text.probe.failurePrefix} {failure}
        </p>
      ) : null}
      {result ? (
        <RuntimeTable locale={locale}>
          <RuntimeRow where={text.probe.handlerRow} runtime={result.handlerRuntime} detail={result.handlerDetail} />
          <RuntimeRow where={text.probe.proxyRow} runtime={result.proxyRuntime} detail={text.probe.proxyDetail} />
        </RuntimeTable>
      ) : null}
    </section>
  );
}
