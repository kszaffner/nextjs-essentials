import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { PostMessageState } from "../postMessageState";
import { StatusLine } from "./StatusLine";

afterEach(cleanup);

function renderStatus(state: PostMessageState, isPending = false) {
  render(<StatusLine state={state} isPending={isPending} />);
  return screen.getByRole("status").textContent;
}

describe("StatusLine", () => {
  it("reports idle before anything is submitted", () => {
    expect(renderStatus({ status: "idle" })).toBe("useActionState: idle");
  });

  it("reports pending while the action runs, whatever the last state was", () => {
    expect(renderStatus({ status: "posted", text: "hi" }, true)).toBe("useActionState: pending");
  });

  it("reports a posted message", () => {
    expect(renderStatus({ status: "posted", text: "hi" })).toBe('useActionState: posted "hi"');
  });

  it("reports why a message was rejected", () => {
    expect(renderStatus({ status: "rejected", reason: "No.", text: "x" })).toBe(
      "useActionState: rejected (No.)",
    );
  });
});
