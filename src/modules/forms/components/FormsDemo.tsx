import { Suspense } from "react";
import type { Locale } from "@/shared/i18n";
import { getFormsText } from "../text";
import { GuestForm } from "./GuestForm";
import { GuestListView } from "./GuestListView";

export function FormsDemo({ locale }: { locale: Locale }) {
  return (
    <div>
      <GuestForm locale={locale} />
      <Suspense fallback={<p>{getFormsText(locale).loadingList}</p>}>
        <GuestListView locale={locale} />
      </Suspense>
    </div>
  );
}
