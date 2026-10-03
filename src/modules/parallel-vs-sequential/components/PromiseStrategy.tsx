import { connection } from "next/server";
import { Suspense } from "react";
import { simulateRequest } from "../server/simulatedRequest";
import { PromiseReader } from "./PromiseReader";
import { Strategy } from "./Strategy";

// The request starts on the server right now, but nothing awaits it here:
// the Client Component unwraps it with use(), so the server does not block.
export async function PromiseStrategy() {
  await connection();
  const pending = simulateRequest("passed-down");

  return (
    <Strategy
      title="Start on the server, read with use()"
      hint="The server starts the request and passes the promise to a Client Component, which reads it with use() behind Suspense."
    >
      <Suspense fallback={<span>waiting for the promise…</span>}>
        <PromiseReader promise={pending} />
      </Suspense>
    </Strategy>
  );
}
