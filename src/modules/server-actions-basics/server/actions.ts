"use server";

import { refresh } from "next/cache";
import { incrementCount } from "./counterStore";

// A Server Function in its own "use server" file: Client Components can
// import it. Public on purpose (it takes no input and only bumps a demo
// counter); a real action authenticates and authorizes the caller here.
export async function incrementCounter() {
  const count = await incrementCount();
  refresh();
  return { count };
}
