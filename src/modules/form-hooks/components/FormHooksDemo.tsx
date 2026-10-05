import { Suspense } from "react";
import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { readMessages } from "../server/messageStore";
import { getFormHooksText } from "../text";
import { MessageBoard } from "./MessageBoard";

async function Board({ locale }: { locale: Locale }) {
  await connection();
  return <MessageBoard locale={locale} messages={readMessages()} />;
}

export function FormHooksDemo({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<p>{getFormHooksText(locale).loadingBoard}</p>}>
      <Board locale={locale} />
    </Suspense>
  );
}
