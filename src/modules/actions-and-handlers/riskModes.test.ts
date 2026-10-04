import { describe, expect, it, vi } from "vitest";
import { RISK_MODES, RiskModeSchema } from "./riskModes";

vi.mock("server-only", () => ({}));

const { reserveItem } = await import("./server/reserveItem");

describe("RiskModeSchema", () => {
  it("accepts every mode and nothing else", () => {
    for (const mode of RISK_MODES) {
      expect(RiskModeSchema.safeParse(mode).success).toBe(true);
    }
    expect(RiskModeSchema.safeParse("bogus").success).toBe(false);
    expect(RiskModeSchema.safeParse(null).success).toBe(false);
  });
});

describe("reserveItem", () => {
  it("succeeds in ok mode", async () => {
    expect(await reserveItem("ok")).toEqual({ ok: true, reservation: "reservation-001" });
  });

  it("returns an expected failure as a value", async () => {
    expect(await reserveItem("expected")).toMatchObject({ ok: false, reason: "out_of_stock" });
  });

  it("throws on an unexpected failure", async () => {
    await expect(reserveItem("unexpected")).rejects.toThrow("Inventory database unreachable");
    await expect(reserveItem("uncaught")).rejects.toThrow();
  });
});
