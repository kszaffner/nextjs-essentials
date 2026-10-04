import "server-only";
import { z } from "zod";

// The boundary: FormData values are always strings (or files, or null), so
// the number is coerced here and every rule is enforced on the server no
// matter what the browser checked.
export const SignupSchema = z.object({
  name: z.string().trim().min(2, "Name needs at least 2 characters").max(30, "Name is at most 30 characters"),
  email: z.email("Enter a valid email address"),
  age: z
    .string()
    .trim()
    .min(1, "Age is required")
    .transform(Number)
    .pipe(
      z
        .number({ error: "Age must be a number" })
        .int("Age must be a whole number")
        .min(13, "You must be at least 13")
        .max(120, "Age is at most 120"),
    ),
});
