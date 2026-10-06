import type { Locale } from "@/shared/i18n";
import { BuiltWithBadge } from "./BuiltWithBadge";
import { SwitchCommands } from "./SwitchCommands";

export function BundlersDemo({ locale }: { locale: Locale }) {
  return (
    <div>
      <BuiltWithBadge locale={locale} />
      <SwitchCommands locale={locale} />
    </div>
  );
}
