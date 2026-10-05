import { connection } from "next/server";
import type { Locale } from "@/shared/i18n";
import { readGuests } from "../server/guestList";
import { getFormsText } from "../text";
import styles from "./Forms.module.css";

export async function GuestListView({ locale }: { locale: Locale }) {
  await connection();
  const text = getFormsText(locale).list;
  const guests = readGuests();

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      {guests.length === 0 ? (
        <p className={styles.list}>{text.empty}</p>
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
