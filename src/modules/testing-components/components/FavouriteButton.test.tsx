import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FavouriteButton } from "./FavouriteButton";

// useRouter() needs the App Router around it; here it is replaced by a spy so
// the test can see where the component tried to go.
const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

afterEach(() => {
  cleanup();
  push.mockClear();
});

describe("FavouriteButton (a Client Component)", () => {
  it("toggles the favourite state and says so to assistive technology", () => {
    render(<FavouriteButton destination="/somewhere/else" />);
    const toggle = screen.getByRole("button", { name: "Add to favourites" });
    expect(toggle.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(toggle);

    const pressed = screen.getByRole("button", { name: "Remove from favourites" });
    expect(pressed.getAttribute("aria-pressed")).toBe("true");
  });

  it("navigates to the destination through the router", () => {
    render(<FavouriteButton destination="/somewhere/else" />);

    fireEvent.click(screen.getByRole("button", { name: "Go to the topic page" }));

    expect(push).toHaveBeenCalledWith("/somewhere/else");
  });
});
