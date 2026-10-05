import "server-only";
import { z } from "zod";

// Messages are codes from signupState.ts, so the server stays language-independent.
// The boundary: FormData values are always strings (or files, or null), so
// the number is coerced here and every rule is enforced on the server no
// matter what the browser checked.
export const SignupSchema = z.object({
  name: z.string().trim().min(2, "nameTooShort").max(30, "nameTooLong"),
  email: z.email("emailInvalid"),
  age: z
    .string()
    .trim()
    .min(1, "ageRequired")
    .transform(Number)
    .pipe(
      z
        .number({ error: "ageNotNumber" })
        .int("ageNotInteger")
        .min(13, "ageTooYoung")
        .max(120, "ageTooOld"),
    ),
});
