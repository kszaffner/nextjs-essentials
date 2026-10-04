import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EventHandlerDemo } from "./EventHandlerDemo";

afterEach(cleanup);

describe("EventHandlerDemo", () => {
  it("turns a handled error into visible state", () => {
    render(<EventHandlerDemo />);

    fireEvent.click(screen.getByRole("button", { name: "Throw with try/catch" }));

    expect(screen.getByRole("status").textContent).toBe(
      "handled: Deliberate error from an event handler",
    );
  });
});
