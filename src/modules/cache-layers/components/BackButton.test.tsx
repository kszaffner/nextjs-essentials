import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BackButton } from "./BackButton";

const back = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back }),
}));

afterEach(() => {
  cleanup();
  back.mockClear();
});

describe("BackButton", () => {
  it("goes back in history when pressed", () => {
    render(<BackButton />);

    fireEvent.click(screen.getByRole("button", { name: "router.back()" }));

    expect(back).toHaveBeenCalledTimes(1);
  });
});
