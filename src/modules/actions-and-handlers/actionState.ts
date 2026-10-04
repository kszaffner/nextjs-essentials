export type RiskyActionState =
  | { status: "idle" }
  | { status: "reserved"; reservation: string }
  | { status: "refused"; message: string };

export const initialRiskyActionState: RiskyActionState = { status: "idle" };
