import { connection } from "next/server";
import { getRuntimeInfo } from "@/modules/runtimes";

export async function GET() {
  await connection();
  return Response.json(getRuntimeInfo());
}
