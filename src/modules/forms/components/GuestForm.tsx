import { addGuestAction, clearGuestsAction } from "../server/actions";
import styles from "./Forms.module.css";

// A Server Component form: the action is a Server Action, so the browser can
// submit it as an ordinary POST even before (or without) JavaScript.
export function GuestForm() {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Guest list</h3>
      <form action={addGuestAction.bind(null, "guest")}>
        <label className={styles.field}>
          Name
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
            Add guest
          </button>
          {/* A different action for the same form, with a bound argument. */}
          <button
            type="submit"
            className={styles.button}
            formAction={addGuestAction.bind(null, "vip")}
          >
            Add as VIP
          </button>
          <button
            type="submit"
            className={styles.button}
            formAction={clearGuestsAction}
            formNoValidate
          >
            Clear list
          </button>
        </div>
      </form>
      <p className={styles.hint}>
        Plain HTML attributes (required, maxLength) give instant feedback; the
        server action parses the input again because the request can come from
        anywhere.
      </p>
    </section>
  );
}
