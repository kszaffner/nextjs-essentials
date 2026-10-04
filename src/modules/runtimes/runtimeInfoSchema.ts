import { z } from "zod";

// Shared by the Route Handler (which produces it) and the browser (which
// parses the response instead of trusting its shape).
export const RuntimeInfoSchema = z.object({
  // "nodejs" or "edge"; set by Next.js for the code that is running.
  runtime: z.string(),
  nodeVersion: z.string(),
  hasEdgeGlobal: z.boolean(),
});

export type RuntimeInfo = z.infer<typeof RuntimeInfoSchema>;
