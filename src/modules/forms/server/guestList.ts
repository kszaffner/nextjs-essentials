import "server-only";

const MAX_GUESTS = 8;

export type Guest = {
  name: string;
  role: "guest" | "vip";
};

let guests: Guest[] = [];

// Process memory standing in for a database: coherent on one server process.
export function addGuest(guest: Guest): void {
  guests = [...guests, guest].slice(-MAX_GUESTS);
}

export function clearGuests(): void {
  guests = [];
}

export function readGuests(): readonly Guest[] {
  return guests;
}
