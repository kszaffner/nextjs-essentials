import { refresh } from "next/cache";
import { incrementCount } from "../server/counterStore";
import styles from "./Actions.module.css";

// Declared inside a Server Component: "use server" marks the function as a
// Server Action, and it can capture values from the render (encrypted when
// sent to the client).
export function InlineActionForm() {
  async function incrementFromServerComponent() {
    "use server";
    await incrementCount();
    refresh();
  }

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>1. Inline action in a Server Component</h3>
      <form action={incrementFromServerComponent}>
        <button type="submit" className={styles.button}>
          Increment (form action)
        </button>
      </form>
      <p className={styles.hint}>
        Works as a plain form post, with or without JavaScript.
      </p>
    </section>
  );
}
