import type { Locale } from "@/shared/i18n";
import {
  addWithRefresh,
  addWithRevalidatePath,
  addWithRevalidateTag,
  addWithUpdateTag,
  clearEntries,
} from "../server/actions";
import { getRevalidationText } from "../text";
import styles from "./Revalidation.module.css";

export function InvalidationActions({ locale }: { locale: Locale }) {
  const text = getRevalidationText(locale).actions;
  const actions = [
    { ...text.updateTag, action: addWithUpdateTag },
    { ...text.revalidateTag, action: addWithRevalidateTag },
    { ...text.revalidatePath, action: addWithRevalidatePath },
    { ...text.refresh, action: addWithRefresh },
  ];

  return (
    <div className={styles.actions}>
      {actions.map(({ label, action, hint }) => (
        <form key={label} action={action} className={styles.row}>
          <button type="submit" className={styles.button}>
            {label}
          </button>
          <span className={styles.hint}>{hint}</span>
        </form>
      ))}
      <form action={clearEntries} className={styles.row}>
        <button type="submit" className={styles.button}>
          {text.clear}
        </button>
      </form>
    </div>
  );
}
