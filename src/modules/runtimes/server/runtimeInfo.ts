import "server-only";
import type { RuntimeInfo } from "../runtimeInfoSchema";

export function getRuntimeInfo(): RuntimeInfo {
  return {
    runtime: process.env.NEXT_RUNTIME ?? "unknown",
    nodeVersion: process.version,
    // The Edge Runtime defines this global; Node.js does not.
    hasEdgeGlobal: "EdgeRuntime" in globalThis,
  };
}
