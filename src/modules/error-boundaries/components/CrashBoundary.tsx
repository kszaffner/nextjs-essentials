import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getErrorBoundariesText } from "../text";
import { ServerCrash } from "./ServerCrash";

export function CrashBoundary({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<p>{getErrorBoundariesText(locale).rendering}</p>}>
      <ServerCrash />
    </Suspense>
  );
}
