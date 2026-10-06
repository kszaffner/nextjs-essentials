import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { GreetingCard } from "./GreetingCard";

afterEach(cleanup);

describe("GreetingCard (a synchronous component)", () => {
  it("greets the person and shows their role", () => {
    render(<GreetingCard locale="en" name="Ada Lovelace" role="Mathematician" />);

    expect(screen.getByRole("heading", { name: "Hello, Ada Lovelace" })).toBeDefined();
    expect(screen.getByText("Mathematician")).toBeDefined();
  });
});
