import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
// refresh() only works inside a Server Action invocation, so it is replaced
// with a spy: the test asserts that the action asks for a refresh.
const refresh = vi.fn();
vi.mock("next/cache", () => ({ refresh: () => refresh() }));

const { addGuestAction, clearGuestsAction } = await import("./actions");
const { clearGuests, readGuests } = await import("./guestList");

function formWith(name: string): FormData {
  const formData = new FormData();
  formData.set("name", name);
  return formData;
}

beforeEach(() => {
  clearGuests();
  refresh.mockClear();
});

describe("addGuestAction", () => {
  it("adds the guest with the bound role and refreshes the page", async () => {
    await addGuestAction("vip", formWith("  Ada  "));

    expect(readGuests()).toEqual([{ name: "Ada", role: "vip" }]);
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("rejects a role the form could not have bound", async () => {
    await addGuestAction("admin", formWith("Mallory"));

    expect(readGuests()).toEqual([]);
    expect(refresh).not.toHaveBeenCalled();
  });

  it("rejects an empty name and a name over 30 characters", async () => {
    await addGuestAction("guest", formWith("   "));
    await addGuestAction("guest", formWith("a".repeat(31)));

    expect(readGuests()).toEqual([]);
  });

  it("rejects a missing name field", async () => {
    await addGuestAction("guest", new FormData());

    expect(readGuests()).toEqual([]);
  });
});

describe("clearGuestsAction", () => {
  it("empties the list and refreshes the page", async () => {
    await addGuestAction("guest", formWith("Ada"));

    await clearGuestsAction();

    expect(readGuests()).toEqual([]);
    expect(refresh).toHaveBeenCalledTimes(2);
  });
});
