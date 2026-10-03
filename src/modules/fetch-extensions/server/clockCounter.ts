import "server-only";

let hits = 0;

// The demo API. `hits` counts how many times this code really ran in this
// server process, so a cached fetch is visible as a number that does not grow.
export function nextClockReading() {
  hits += 1;
  return { hits, servedAt: new Date().toISOString() };
}
