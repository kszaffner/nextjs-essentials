import type { NextRequest } from "next/server";
import { handleDeleteNote, handleGetNote } from "@/modules/route-handlers";

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/route-handlers/notes/[id]">,
) {
  const { id } = await context.params;
  return handleGetNote(id);
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext<"/api/route-handlers/notes/[id]">,
) {
  const { id } = await context.params;
  return handleDeleteNote(id);
}
