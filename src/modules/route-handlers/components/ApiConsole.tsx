"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n";
import { getRouteHandlersText, type RouteHandlersText } from "../text";
import { apiRequests, type ApiRequest } from "./apiRequests";
import styles from "./ApiConsole.module.css";

async function describeResponse(request: ApiRequest, text: RouteHandlersText): Promise<string> {
  const response = await fetch(request.path, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
  const contentType = response.headers.get("content-type") ?? text.none;
  const location = response.headers.get("location");
  const bodyText = await response.text();

  return [
    `${request.method} ${request.path}`,
    `-> ${response.status} ${response.statusText}`,
    `content-type: ${contentType}`,
    location ? `location: ${location}` : null,
    `body: ${bodyText === "" ? text.empty : bodyText}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function ApiConsole({ locale }: { locale: Locale }) {
  const text = getRouteHandlersText(locale);
  const [result, setResult] = useState(text.prompt);

  async function send(request: ApiRequest) {
    setResult(text.sending(request.label));
    setResult(await describeResponse(request, text));
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <div className={styles.buttons}>
        {apiRequests.map((request) => (
          <button key={request.label} type="button" className={styles.button} onClick={() => send(request)}>
            {request.label}
          </button>
        ))}
      </div>
      <pre className={styles.result} role="status">
        {result}
      </pre>
    </section>
  );
}
