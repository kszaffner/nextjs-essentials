import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getFetchExtensionsText } from "../text";
import { FetchLab } from "./FetchLab";

export function FetchExtensionsDemo({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<p>{getFetchExtensionsText(locale).loading}</p>}>
      <FetchLab locale={locale} />
    </Suspense>
  );
}
