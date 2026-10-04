import { connection } from "next/server";
import { readGuests } from "../server/guestList";
import styles from "./Forms.module.css";

export async function GuestListView() {
  await connection();
  const guests = readGuests();

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Who is coming</h3>
      {guests.length === 0 ? (
        <p className={styles.list}>(nobody yet)</p>
      ) : (
        <ul className={styles.list}>
          {guests.map((guest, index) => (
            // Names can repeat, so the position is part of the key.
            <li key={`${guest.name}-${index}`}>
              {guest.name} ({guest.role})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
