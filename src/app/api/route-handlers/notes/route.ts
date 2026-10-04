import type { NextRequest } from "next/server";
import { handleCreateNote, handleListNotes } from "@/modules/route-handlers";

export function GET(request: NextRequest) {
  return handleListNotes(request);
}

export function POST(request: NextRequest) {
  return handleCreateNote(request);
}
