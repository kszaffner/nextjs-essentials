import type { Locale } from "@/shared/i18n";
import { ActionForm } from "./ActionForm";
import { HandlerConsole } from "./HandlerConsole";

export function ActionsAndHandlersDemo({ locale }: { locale: Locale }) {
  return (
    <div>
      <HandlerConsole locale={locale} />
      <ActionForm locale={locale} />
    </div>
  );
}
