import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { SignupState } from "../signupState";
import { SignupFields } from "./SignupFields";

afterEach(cleanup);

const invalidState: SignupState = {
  status: "invalid",
  fieldErrors: { email: "emailInvalid" },
  values: { name: "Ada", email: "nope", age: "30" },
};

describe("SignupFields", () => {
  it("starts empty with no errors", () => {
    render(<SignupFields locale="en" state={{ status: "idle" }} />);

    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("refills what the user typed and shows the error next to its field", () => {
    render(<SignupFields locale="en" state={invalidState} />);

    expect((screen.getByLabelText(/^Name/) as HTMLInputElement).value).toBe("Ada");
    expect(screen.getByRole("alert").textContent).toBe("Enter a valid email address");
  });

  it("marks only the invalid field and links it to its message", () => {
    render(<SignupFields locale="en" state={invalidState} />);

    const email = screen.getByLabelText(/^Email/);
    expect(email.getAttribute("aria-invalid")).toBe("true");
    expect(email.getAttribute("aria-describedby")).toBe(screen.getByRole("alert").id);
    expect(screen.getByLabelText(/^Name/).getAttribute("aria-invalid")).toBeNull();
  });

  it("does not refill the comment field", () => {
    render(<SignupFields locale="en" state={invalidState} />);

    expect((screen.getByLabelText(/Comment/) as HTMLInputElement).value).toBe("");
  });
});
