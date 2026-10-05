import { connection } from "next/server";
import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { simulateRequest } from "../server/simulatedRequest";
import { PromiseReader } from "./PromiseReader";
import { getFetchingStrategiesText } from "../text";
import { Strategy } from "./Strategy";

// The request starts on the server right now, but nothing awaits it here:
// the Client Component unwraps it with use(), so the server does not block.
export async function PromiseStrategy({ locale }: { locale: Locale }) {
  await connection();
  const text = getFetchingStrategiesText(locale).promise;
  const pending = simulateRequest("passed-down");

  return (
    <Strategy title={text.title} hint={text.hint}>
      <Suspense fallback={<span>{text.waiting}</span>}>
        <PromiseReader promise={pending} label={text.clientRead} />
      </Suspense>
    </Strategy>
  );
}
