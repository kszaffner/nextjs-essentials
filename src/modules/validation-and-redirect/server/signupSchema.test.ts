import { describe, expect, it, vi } from "vitest";

// "server-only" throws outside the server module graph; the schema itself is
// plain logic, so the guard is stubbed for this test.
vi.mock("server-only", () => ({}));

const { SignupSchema } = await import("./signupSchema");

const validInput = { name: "Ada", email: "ada@example.com", age: "30" };

function firstMessage(input: Record<string, string>, field: string): string | undefined {
  const result = SignupSchema.safeParse(input);
  if (result.success) {
    return undefined;
  }
  return result.error.issues.find((issue) => issue.path[0] === field)?.message;
}

describe("SignupSchema", () => {
  it("accepts valid input and turns the age into a number", () => {
    const result = SignupSchema.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data?.age).toBe(30);
  });

  it("trims the name and the age", () => {
    const result = SignupSchema.safeParse({ ...validInput, name: "  Ada  ", age: " 40 " });

    expect(result.data).toEqual({ name: "Ada", email: "ada@example.com", age: 40 });
  });

  it("rejects an empty age instead of coercing it to zero", () => {
    expect(firstMessage({ ...validInput, age: "" }, "age")).toBe("Age is required");
  });

  it("explains a non-numeric age", () => {
    expect(firstMessage({ ...validInput, age: "abc" }, "age")).toBe("Age must be a number");
  });

  it("rejects ages outside the allowed range and fractions", () => {
    expect(firstMessage({ ...validInput, age: "12" }, "age")).toBe("You must be at least 13");
    expect(firstMessage({ ...validInput, age: "121" }, "age")).toBe("Age is at most 120");
    expect(firstMessage({ ...validInput, age: "12.5" }, "age")).toBe("Age must be a whole number");
  });

  it("rejects a short name and an invalid email", () => {
    expect(firstMessage({ ...validInput, name: "A" }, "name")).toBe("Name needs at least 2 characters");
    expect(firstMessage({ ...validInput, email: "nope" }, "email")).toBe("Enter a valid email address");
  });
});
