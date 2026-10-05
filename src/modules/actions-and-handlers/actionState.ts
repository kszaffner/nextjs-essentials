// A refusal carries a code, not a sentence: the UI picks the wording in the
// reader's language.
export type RefusalCode = "out_of_stock" | "invalid_mode";

export type RiskyActionState =
  | { status: "idle" }
  | { status: "reserved"; reservation: string }
  | { status: "refused"; code: RefusalCode };

export const initialRiskyActionState: RiskyActionState = { status: "idle" };
