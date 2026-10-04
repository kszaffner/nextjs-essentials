"use server";

import type { RiskyActionState } from "../actionState";
import { RiskModeSchema } from "../riskModes";
import { reserveItem } from "./reserveItem";

// Expected failures are returned as state. An unexpected one is not caught
// here: it propagates, Next.js reports it through its central error hook, and
// the nearest error boundary shows a safe message. Catching it only to log it
// would hide it from both. Public on purpose: it only simulates outcomes.
export async function reserveAction(
  _previousState: RiskyActionState,
  formData: FormData,
): Promise<RiskyActionState> {
  const mode = RiskModeSchema.safeParse(formData.get("mode"));
  if (!mode.success) {
    return { status: "refused", message: "Choose one of the listed modes." };
  }

  const result = await reserveItem(mode.data);
  return result.ok
    ? { status: "reserved", reservation: result.reservation }
    : { status: "refused", message: result.message };
}
