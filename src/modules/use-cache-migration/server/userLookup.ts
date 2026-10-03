import "server-only";
import { cacheLife, cacheTag } from "next/cache";

let executions = 0;

export function getExecutionCount(): number {
  return executions;
}

// The migrated form of an unstable_cache wrapper. There is no key-parts array:
// the cache key is derived from the arguments (and captured values), so each
// distinct id gets its own entry. The tag and lifetime replace the options
// object that unstable_cache took.
export async function getUserProfile(id: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`migration-demo-user-${id}`);

  executions += 1;
  return { id, name: `User ${id}`, loadedAt: new Date().toISOString() };
}
