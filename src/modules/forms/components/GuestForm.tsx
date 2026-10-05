import type { Locale } from "@/shared/i18n";
import { addGuestAction, clearGuestsAction } from "../server/actions";
import { getFormsText } from "../text";
import styles from "./Forms.module.css";

// A Server Component form: the action is a Server Action, so the browser can
// submit it as an ordinary POST even before (or without) JavaScript.
export function GuestForm({ locale }: { locale: Locale }) {
  const text = getFormsText(locale).form;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <form action={addGuestAction.bind(null, "guest")}>
        <label className={styles.field}>
          {text.name}
          <input
            className={styles.input}
            type="text"
            name="name"
            required
            maxLength={30}
            autoComplete="off"
          />
        </label>
        <div className={styles.buttons}>
          <button type="submit" className={styles.button}>
            {text.add}
          </button>
          {/* A different action for the same form, with a bound argument. */}
          <button
            type="submit"
            className={styles.button}
            formAction={addGuestAction.bind(null, "vip")}
          >
            {text.addVip}
          </button>
          <button
            type="submit"
            className={styles.button}
            formAction={clearGuestsAction}
            formNoValidate
          >
            {text.clear}
          </button>
        </div>
      </form>
      <p className={styles.hint}>{text.hint}</p>
    </section>
  );
}
