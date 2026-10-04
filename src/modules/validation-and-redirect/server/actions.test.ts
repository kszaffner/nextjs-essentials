import { describe, expect, it, vi } from "vitest";
import { initialSignupState } from "../signupState";

// "server-only" throws outside the server module graph; the logic under test
// is plain, so the guard is stubbed.
vi.mock("server-only", () => ({}));

const { signUp } = await import("./actions");

const VALID_EMAIL = "ada@example.com";

function formWith(fields: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [name, value] of Object.entries(fields)) {
    formData.set(name, value);
  }
  return formData;
}

describe("signUp", () => {
  it("returns field errors and the typed values when the input is invalid", async () => {
    const state = await signUp(initialSignupState, formWith({ name: "A", email: "nope", age: "7" }));

    expect(state).toEqual({
      status: "invalid",
      fieldErrors: {
        name: "Name needs at least 2 characters",
        email: "Enter a valid email address",
        age: "You must be at least 13",
      },
      values: { name: "A", email: "nope", age: "7" },
    });
  });

  it("ignores a field that is not text instead of trusting it", async () => {
    const formData = formWith({ email: VALID_EMAIL, age: "30" });
    formData.set("name", new File(["x"], "name.txt"));

    const state = await signUp(initialSignupState, formData);

    expect(state).toMatchObject({ status: "invalid", values: { name: "" } });
  });

  it("redirects to the welcome page with the encoded name when the input is valid", async () => {
    // redirect() works by throwing; its digest carries the destination.
    await expect(
      signUp(initialSignupState, formWith({ name: "Ada Lovelace", email: VALID_EMAIL, age: "36" })),
    ).rejects.toMatchObject({
      digest: expect.stringContaining("/server-actions/validation-and-redirect/demo/welcome?name=Ada%20Lovelace"),
    });
  });

  it("marks the redirect as temporary (307)", async () => {
    await expect(
      signUp(initialSignupState, formWith({ name: "Ada", email: VALID_EMAIL, age: "36" })),
    ).rejects.toMatchObject({ digest: expect.stringMatching(/^NEXT_REDIRECT;.*;307;$/) });
  });
});
