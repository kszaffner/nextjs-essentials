// Shared by the Server Action (which returns it) and the Client Component
// (which renders it), so it lives outside the "use server" file, where only
// async functions may be exported.
export type PostMessageState =
  | { status: "idle" }
  | { status: "posted"; text: string }
  | { status: "rejected"; reason: string; text: string };

export const initialPostMessageState: PostMessageState = { status: "idle" };
