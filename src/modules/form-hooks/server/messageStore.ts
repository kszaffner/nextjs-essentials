import "server-only";

const MAX_MESSAGES = 6;

let messages: string[] = [];

// Process memory standing in for a database: coherent on one server process.
export function addMessage(text: string): void {
  messages = [...messages, text].slice(-MAX_MESSAGES);
}

export function readMessages(): readonly string[] {
  return messages;
}
