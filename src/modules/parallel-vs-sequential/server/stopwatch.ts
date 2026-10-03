import "server-only";

export type Stopwatch = {
  elapsedMs: () => number;
};

// Measures real elapsed time on the server. Kept out of the components so
// they stay free of direct impure calls such as Date.now().
export function startStopwatch(): Stopwatch {
  const startedAt = Date.now();
  return { elapsedMs: () => Date.now() - startedAt };
}
