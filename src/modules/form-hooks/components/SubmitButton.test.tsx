import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SubmitButton } from "./SubmitButton";

afterEach(cleanup);

describe("SubmitButton", () => {
  it("is enabled and idle when no submission is in flight", () => {
    render(
      <form>
        <SubmitButton />
      </form>,
    );

    const button = screen.getByRole("button", { name: "Post message" });
    expect((button as HTMLButtonElement).disabled).toBe(false);
  });
});
