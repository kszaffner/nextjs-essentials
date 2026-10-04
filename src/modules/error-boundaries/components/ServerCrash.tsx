import { connection } from "next/server";
import type { ReactNode } from "react";

// Throws while a Server Component renders, after the shell has streamed.
// The message deliberately mentions internals, to show what the browser gets.
// The return type says ReactNode so React accepts it as a component, even
// though it never returns.
export async function ServerCrash(): Promise<ReactNode> {
  await connection();
  throw new Error("Deliberate server error with an internal detail: table users, column ssn");
}
