import { describe, expect, it } from "vitest";
import { RuntimeInfoSchema } from "./runtimeInfoSchema";

describe("RuntimeInfoSchema", () => {
  it("accepts the shape the Route Handler returns", () => {
    const parsed = RuntimeInfoSchema.safeParse({ runtime: "nodejs", nodeVersion: "v22.0.0", hasEdgeGlobal: false });

    expect(parsed.success).toBe(true);
  });

  it("rejects a response with the wrong shape instead of trusting it", () => {
    expect(RuntimeInfoSchema.safeParse({ runtime: "nodejs" }).success).toBe(false);
    expect(RuntimeInfoSchema.safeParse({ runtime: 1, nodeVersion: "v22", hasEdgeGlobal: false }).success).toBe(false);
  });
});
