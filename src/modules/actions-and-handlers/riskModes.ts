import { z } from "zod";

// ok:         the operation succeeds.
// expected:   a business rule says no (out of stock): part of the contract.
// unexpected: a dependency fails: a bug or outage, not the caller's fault.
// uncaught:   like unexpected, but the code does not catch it at all.
export const RISK_MODES = ["ok", "expected", "unexpected", "uncaught"] as const;

export const RiskModeSchema = z.enum(RISK_MODES);

export type RiskMode = z.infer<typeof RiskModeSchema>;
