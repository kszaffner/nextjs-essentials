import "server-only";

const SIMULATED_WORK_MS = 600;

let count = 0;

export function readCount(): number {
  return count;
}

// Takes a visible amount of time, so the order and timing of invocations can
// be observed from the browser.
export async function incrementCount(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_WORK_MS));
  count += 1;
  return count;
}
