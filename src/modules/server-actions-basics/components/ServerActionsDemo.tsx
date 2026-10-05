import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getServerActionsBasicsText } from "../text";
import { ClientInvoker } from "./ClientInvoker";
import { CounterDisplay } from "./CounterDisplay";
import { InlineActionForm } from "./InlineActionForm";

export function ServerActionsDemo({ locale }: { locale: Locale }) {
  return (
    <div>
      <Suspense fallback={<p>{getServerActionsBasicsText(locale).readingCounter}</p>}>
        <CounterDisplay locale={locale} />
      </Suspense>
      <InlineActionForm locale={locale} />
      <ClientInvoker locale={locale} />
    </div>
  );
}
