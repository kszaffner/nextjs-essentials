import "server-only";
import type { RiskMode } from "../riskModes";

export type ReserveResult =
  | { ok: true; reservation: string }
  | { ok: false; reason: "out_of_stock"; message: string };

// An expected failure is a value in the return type, so callers must handle
// it. An unexpected one is an exception.
export async function reserveItem(mode: RiskMode): Promise<ReserveResult> {
  switch (mode) {
    case "ok":
      return { ok: true, reservation: "reservation-001" };
    case "expected":
      return { ok: false, reason: "out_of_stock", message: "That item is out of stock." };
    case "unexpected":
    case "uncaught":
      // An internal detail that must never reach a response body.
      throw new Error("Inventory database unreachable: connect ECONNREFUSED 10.0.0.12:5432");
    default: {
      const unreachable: never = mode;
      return unreachable;
    }
  }
}
