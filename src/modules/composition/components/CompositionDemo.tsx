import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getCompositionText } from "../text";
import { Collapsible } from "./Collapsible";
import { ServerFactsPanel } from "./ServerFactsPanel";

// This Server Component owns the composition: it imports both pieces and
// nests one inside the other, so the client file never imports server code.
export function CompositionDemo({ locale }: { locale: Locale }) {
  const text = getCompositionText(locale);

  return (
    <Collapsible title={text.collapsibleTitle}>
      <Suspense fallback={<p>{text.rendering}</p>}>
        <ServerFactsPanel locale={locale} />
      </Suspense>
    </Collapsible>
  );
}
