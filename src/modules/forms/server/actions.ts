"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { addGuest, clearGuests } from "./guestList";

// Everything a Server Action receives comes from the client, including bound
// arguments and hidden fields: it is parsed here, never trusted. Rejected
// input has no side effect; reporting the errors back to the user is the
// topic of the validation demo.
const GuestInputSchema = z.object({
  name: z.string().trim().min(1).max(30),
  role: z.enum(["guest", "vip"]),
});

// Used as <form action={addGuestAction}>: receives the FormData, and, because
// it is bound with a role below, the role comes first.
export async function addGuestAction(role: string, formData: FormData) {
  const parsed = GuestInputSchema.safeParse({
    name: formData.get("name"),
    role,
  });

  if (parsed.success) {
    addGuest(parsed.data);
    refresh();
  }
}

// Used as a button's formAction: a second action for the same form.
export async function clearGuestsAction() {
  clearGuests();
  refresh();
}
