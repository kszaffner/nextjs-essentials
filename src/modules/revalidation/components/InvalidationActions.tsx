import {
  addWithRefresh,
  addWithRevalidatePath,
  addWithRevalidateTag,
  addWithUpdateTag,
  clearEntries,
} from "../server/actions";
import styles from "./Revalidation.module.css";

const actions = [
  {
    label: "Add + updateTag",
    action: addWithUpdateTag,
    hint: "The list shows the new entry right away.",
  },
  {
    label: "Add + revalidateTag(…, 'max')",
    action: addWithRevalidateTag,
    hint: "Old list right after, and on the next visit while it regenerates; a later visit shows the new entry.",
  },
  {
    label: "Add + revalidatePath",
    action: addWithRevalidatePath,
    hint: "Invalidates by path instead of by tag; the list updates right away.",
  },
  {
    label: "Add + refresh()",
    action: addWithRefresh,
    hint: "Refreshes the router only; the cached list is not invalidated.",
  },
] as const;

export function InvalidationActions() {
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
          Clear (updateTag)
        </button>
      </form>
    </div>
  );
}
