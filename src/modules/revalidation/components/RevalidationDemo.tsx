import type { Locale } from "@/shared/i18n";
import { EntryList } from "./EntryList";
import { InvalidationActions } from "./InvalidationActions";

export function RevalidationDemo({ locale }: { locale: Locale }) {
  return (
    <div>
      <EntryList locale={locale} />
      <InvalidationActions locale={locale} />
    </div>
  );
}
