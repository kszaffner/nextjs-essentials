import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { LoadProfile } from "../profile";
import { AsyncProfileCard } from "./AsyncProfileCard";

afterEach(cleanup);

const ada = { id: "ada", name: "Ada Lovelace", role: "Mathematician" };

describe("AsyncProfileCard (an async Server Component)", () => {
  // The pattern that works: an async component is just an async function that
  // returns JSX, so call it, await the result, and render that.
  it("renders the profile the loader returns", async () => {
    const loadProfile = vi.fn<LoadProfile>(async () => ada);

    render(await AsyncProfileCard({ profileId: "ada", loadProfile }));

    expect(screen.getByRole("heading", { name: "Ada Lovelace" })).toBeDefined();
    expect(loadProfile).toHaveBeenCalledWith("ada");
  });

  it("says plainly when there is no such profile", async () => {
    const loadProfile: LoadProfile = async () => undefined;

    render(await AsyncProfileCard({ profileId: "nobody", loadProfile }));

    expect(screen.getByRole("alert").textContent).toBe("No profile with id nobody.");
  });

  it("lets a failing loader propagate (an error boundary would catch it)", async () => {
    const loadProfile: LoadProfile = async () => {
      throw new Error("database down");
    };

    await expect(AsyncProfileCard({ profileId: "ada", loadProfile })).rejects.toThrow("database down");
  });

  // The trap: rendering an async component as JSX does not fail, it silently
  // renders nothing, so a test that only checks "no crash" would pass.
  it("renders nothing when it is rendered directly as JSX", () => {
    const loadProfile: LoadProfile = async () => ada;

    const { container } = render(<AsyncProfileCard profileId="ada" loadProfile={loadProfile} />);

    expect(container.textContent).toBe("");
  });
});
