import "server-only";

const MAX_ENTRIES = 6;

let nextNumber = 1;
let entries: string[] = [];

// A stand-in for a database. It lives in this server process's memory, so the
// demo is only coherent on a single process (next start, local dev).
export function addEntry(): void {
  entries = [...entries, `Entry #${nextNumber}`].slice(-MAX_ENTRIES);
  nextNumber += 1;
}

export function resetEntries(): void {
  entries = [];
  nextNumber = 1;
}

export function readEntries(): readonly string[] {
  return entries;
}
