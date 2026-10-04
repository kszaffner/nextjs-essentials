import "server-only";
import { NextResponse, connection, type NextRequest } from "next/server";
import { z } from "zod";
import { errorResponse } from "./apiErrors";
import { createNote, deleteNote, findNote, listNotes } from "./noteStore";

const NOTES_PATH = "/api/route-handlers/notes";

const ListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

const CreateBodySchema = z.object({
  text: z.string().trim().min(1).max(140),
});

// GET /notes?limit=
export async function handleListNotes(request: NextRequest) {
  // Always per request: the list changes, so it must never be prerendered.
  await connection();

  const query = ListQuerySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!query.success) {
    return errorResponse(400, {
      code: "invalid_query",
      message: "limit must be a whole number from 1 to 20.",
      details: z.flattenError(query.error).fieldErrors,
    });
  }

  return NextResponse.json({ notes: listNotes(query.data.limit) });
}

// POST /notes with a JSON body
export async function handleCreateNote(request: NextRequest) {
  await connection();

  // A cross-site form can post text/plain without a CORS preflight, and
  // Route Handlers have no built-in Origin check. Requiring a JSON content
  // type makes a cross-site request non-simple, so browsers preflight it.
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return errorResponse(415, {
      code: "unsupported_media_type",
      message: "Send the body as application/json.",
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    // Expected failure: the caller sent malformed JSON, so translate it into
    // a 400 the caller can act on.
    return errorResponse(400, {
      code: "invalid_json",
      message: "The request body is not valid JSON.",
    });
  }

  const parsed = CreateBodySchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(422, {
      code: "invalid_body",
      message: "text must be 1 to 140 characters.",
      details: z.flattenError(parsed.error).fieldErrors,
    });
  }

  const note = createNote(parsed.data.text);
  return NextResponse.json(note, {
    status: 201,
    headers: { Location: `${NOTES_PATH}/${note.id}` },
  });
}

// GET /notes/:id
export async function handleGetNote(id: string) {
  await connection();

  const note = findNote(id);
  if (!note) {
    return errorResponse(404, { code: "not_found", message: `No note with id ${id}.` });
  }
  return NextResponse.json(note);
}

// DELETE /notes/:id
export async function handleDeleteNote(id: string) {
  await connection();

  if (!deleteNote(id)) {
    return errorResponse(404, { code: "not_found", message: `No note with id ${id}.` });
  }
  // 204: success with no body.
  return new NextResponse(null, { status: 204 });
}
