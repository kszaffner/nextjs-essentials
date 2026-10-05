import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LocaleProvider } from "@/shared/i18n";
import { LikeButton } from "./LikeButton";

afterEach(cleanup);

describe("LikeButton", () => {
  it("counts every click", () => {
    render(
      <LocaleProvider locale="en">
        <LikeButton />
      </LocaleProvider>,
    );
    const button = screen.getByRole("button", { name: /Like/ });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(button.textContent).toBe("Like (2)");
  });
});
