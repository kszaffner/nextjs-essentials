"use client";

import { useState } from "react";
import { RISK_MODES, type RiskMode } from "../riskModes";
import styles from "./Handling.module.css";

async function callHandler(mode: RiskMode): Promise<string> {
  const response = await fetch(`/api/error-handling/risky?mode=${mode}`);
  const bodyText = await response.text();

  return [
    `GET /api/error-handling/risky?mode=${mode}`,
    `-> ${response.status} ${response.statusText}`,
    `content-type: ${response.headers.get("content-type") ?? "(none)"}`,
    `body: ${bodyText === "" ? "(empty)" : bodyText}`,
  ].join("\n");
}

export function HandlerConsole() {
  const [result, setResult] = useState("Press a button to call the Route Handler.");

  async function run(mode: RiskMode) {
    setResult(`Calling with mode=${mode}…`);
    setResult(await callHandler(mode));
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Route Handler</h3>
      <div className={styles.buttons}>
        {RISK_MODES.map((mode) => (
          <button key={mode} type="button" className={styles.button} onClick={() => run(mode)}>
            mode={mode}
          </button>
        ))}
      </div>
      <pre className={styles.result} role="status">
        {result}
      </pre>
    </section>
  );
}
