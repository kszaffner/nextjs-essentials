import { describe, expect, it, vi } from "vitest";
import { initialRiskyActionState } from "../actionState";

vi.mock("server-only", () => ({}));

const { reserveAction } = await import("./actions");

function formWith(mode: string | null): FormData {
  const formData = new FormData();
  if (mode !== null) {
    formData.set("mode", mode);
  }
  return formData;
}

describe("reserveAction", () => {
  it("returns a reservation when the operation succeeds", async () => {
    expect(await reserveAction(initialRiskyActionState, formWith("ok"))).toEqual({
      status: "reserved",
      reservation: "reservation-001",
    });
  });

  it("returns an expected failure as state instead of throwing", async () => {
    expect(await reserveAction(initialRiskyActionState, formWith("expected"))).toEqual({
      status: "refused",
      code: "out_of_stock",
    });
  });

  it("lets an unexpected failure propagate to the error boundary", async () => {
    await expect(reserveAction(initialRiskyActionState, formWith("unexpected"))).rejects.toThrow(
      "Inventory database unreachable",
    );
  });

  it("refuses an unknown or missing mode without running anything", async () => {
    const expected = { status: "refused", code: "invalid_mode" };

    expect(await reserveAction(initialRiskyActionState, formWith("bogus"))).toEqual(expected);
    expect(await reserveAction(initialRiskyActionState, formWith(null))).toEqual(expected);
  });
});
