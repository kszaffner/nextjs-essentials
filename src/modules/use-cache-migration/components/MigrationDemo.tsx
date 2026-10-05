import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getMigrationText } from "../text";
import { LookupReport } from "./LookupReport";

export function MigrationDemo({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<p>{getMigrationText(locale).loading}</p>}>
      <LookupReport locale={locale} />
    </Suspense>
  );
}
