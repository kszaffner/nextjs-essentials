"use client";

import { useState } from "react";
import { apiRequests, type ApiRequest } from "./apiRequests";
import styles from "./ApiConsole.module.css";

async function describeResponse(request: ApiRequest): Promise<string> {
  const response = await fetch(request.path, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
  const contentType = response.headers.get("content-type") ?? "(none)";
  const location = response.headers.get("location");
  const bodyText = await response.text();

  return [
    `${request.method} ${request.path}`,
    `-> ${response.status} ${response.statusText}`,
    `content-type: ${contentType}`,
    location ? `location: ${location}` : null,
    `body: ${bodyText === "" ? "(empty)" : bodyText}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function ApiConsole() {
  const [result, setResult] = useState("Press a button to call the API.");

  async function send(request: ApiRequest) {
    setResult(`Sending ${request.label}…`);
    setResult(await describeResponse(request));
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Notes API console</h3>
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
