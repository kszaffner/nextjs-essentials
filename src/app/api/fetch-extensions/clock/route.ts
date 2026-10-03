import { connection } from "next/server";
import { nextClockReading } from "@/modules/fetch-extensions";

export async function GET() {
  // Explicit: this handler must run per request, never be prerendered, or the
  // demo's hit counter would be frozen at build time.
  await connection();
  return Response.json(nextClockReading());
}
