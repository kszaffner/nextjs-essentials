import "server-only";

export const SIMULATED_REQUEST_MS = 600;

// Stands in for a network call or query that takes a known time.
export async function simulateRequest(label: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_REQUEST_MS));
  return `${label} data`;
}
