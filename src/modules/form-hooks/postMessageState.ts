// Shared by the Server Action (which returns it) and the Client Component
// (which renders it), so it lives outside the "use server" file, where only
// async functions may be exported.
// A rejection carries a code, not a sentence: the UI picks the wording in the
// reader's language.
export type RejectionReason = "invalidLength" | "rejectedByServer";

export type PostMessageState =
  | { status: "idle" }
  | { status: "posted"; text: string }
  | { status: "rejected"; reason: RejectionReason; text: string };

export const initialPostMessageState: PostMessageState = { status: "idle" };
