"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n";
import { RISK_MODES, type RiskMode } from "../riskModes";
import { getHandlingText, type HandlingText } from "../text";
import styles from "./Handling.module.css";

async function callHandler(mode: RiskMode, text: HandlingText["handler"]): Promise<string> {
  const response = await fetch(`/api/error-handling/risky?mode=${mode}`);
  const bodyText = await response.text();

  return [
    `GET /api/error-handling/risky?mode=${mode}`,
    `-> ${response.status} ${response.statusText}`,
    `content-type: ${response.headers.get("content-type") ?? text.none}`,
    `body: ${bodyText === "" ? text.empty : bodyText}`,
  ].join("\n");
}

export function HandlerConsole({ locale }: { locale: Locale }) {
  const text = getHandlingText(locale).handler;
  const [result, setResult] = useState(text.prompt);

  async function run(mode: RiskMode) {
    setResult(text.calling(mode));
    setResult(await callHandler(mode, text));
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
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
