import "server-only";

const MAX_NOTES = 20;

export type Note = {
  id: string;
  text: string;
};

let nextId = 1;
let notes: Note[] = [{ id: "1", text: "A note that exists from the start" }];
nextId = 2;

// Process memory standing in for a database: coherent on one server process.
export function listNotes(limit: number): readonly Note[] {
  return notes.slice(-limit);
}

export function findNote(id: string): Note | undefined {
  return notes.find((note) => note.id === id);
}

export function createNote(text: string): Note {
  const note = { id: String(nextId), text };
  nextId += 1;
  notes = [...notes, note].slice(-MAX_NOTES);
  return note;
}

export function deleteNote(id: string): boolean {
  const sizeBefore = notes.length;
  notes = notes.filter((note) => note.id !== id);
  return notes.length < sizeBefore;
}
