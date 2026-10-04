import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
// connection() only works inside a request, so it is replaced; everything
// else in next/server (NextRequest, NextResponse) is the real thing.
vi.mock("next/server", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/server")>()),
  connection: vi.fn(async () => {}),
}));

const { handleCreateNote, handleDeleteNote, handleGetNote, handleListNotes } = await import("./notesApi");

const NOTES_URL = "http://localhost/api/route-handlers/notes";

function post(body: string, contentType = "application/json") {
  return new NextRequest(NOTES_URL, { method: "POST", headers: { "content-type": contentType }, body });
}

async function createNote(text: string) {
  const response = await handleCreateNote(post(JSON.stringify({ text })));
  return { response, body: await response.json() };
}

describe("handleCreateNote", () => {
  it("creates a note: 201 with a Location header pointing at it", async () => {
    const { response, body } = await createNote("first");

    expect(response.status).toBe(201);
    expect(response.headers.get("location")).toBe(`/api/route-handlers/notes/${body.id}`);
    expect(body).toMatchObject({ text: "first" });
  });

  it("refuses a body that is not application/json with 415", async () => {
    const response = await handleCreateNote(post(JSON.stringify({ text: "x" }), "text/plain"));

    expect(response.status).toBe(415);
    expect(await response.json()).toMatchObject({ code: "unsupported_media_type" });
  });

  it("answers malformed JSON with 400 and a stable code", async () => {
    const response = await handleCreateNote(post("{not json"));

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ code: "invalid_json" });
  });

  it("answers well-formed but invalid data with 422 and per-field details", async () => {
    const response = await handleCreateNote(post(JSON.stringify({ text: "" })));

    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ code: "invalid_body", details: { text: expect.any(Array) } });
  });
});

describe("handleListNotes", () => {
  it("returns the notes", async () => {
    await createNote("listed");

    const response = await handleListNotes(new NextRequest(NOTES_URL));

    expect(response.status).toBe(200);
    expect((await response.json()).notes).toContainEqual(expect.objectContaining({ text: "listed" }));
  });

  it("honors the limit parameter", async () => {
    await createNote("a");
    await createNote("b");

    const response = await handleListNotes(new NextRequest(`${NOTES_URL}?limit=1`));

    expect((await response.json()).notes).toHaveLength(1);
  });

  it.each(["abc", "0", "21", "1.5"])("rejects limit=%s with 400", async (limit) => {
    const response = await handleListNotes(new NextRequest(`${NOTES_URL}?limit=${limit}`));

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ code: "invalid_query" });
  });
});

describe("handleGetNote and handleDeleteNote", () => {
  it("gets an existing note and 404s an unknown one", async () => {
    const { body } = await createNote("find me");

    expect((await handleGetNote(body.id)).status).toBe(200);
    const missing = await handleGetNote("does-not-exist");
    expect(missing.status).toBe(404);
    expect(await missing.json()).toMatchObject({ code: "not_found" });
  });

  it("deletes with an empty 204, then 404s the same id", async () => {
    const { body } = await createNote("delete me");

    const deleted = await handleDeleteNote(body.id);
    expect(deleted.status).toBe(204);
    expect(await deleted.text()).toBe("");

    expect((await handleDeleteNote(body.id)).status).toBe(404);
  });
});
