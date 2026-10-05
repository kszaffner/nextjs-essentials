"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { localizePath } from "@/shared/i18n";
import { getCookieLocale } from "@/shared/i18n/cookie";
import { isSignupErrorCode, type SignupErrorCode, type SignupState } from "../signupState";
import { SignupSchema } from "./signupSchema";

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

// Anything outside the known codes still reaches the user as a generic message.
function firstErrorCode(messages: readonly string[] | undefined): SignupErrorCode | undefined {
  const message = messages?.[0];
  if (message === undefined) {
    return undefined;
  }
  return isSignupErrorCode(message) ? message : "invalidValue";
}

// Public on purpose: it creates nothing, it only validates and redirects. A
// real signup would also authenticate or rate-limit here.
export async function signUp(
  _previousState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const values = {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    age: readText(formData, "age"),
  };

  const parsed = SignupSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    return {
      status: "invalid",
      fieldErrors: {
        name: firstErrorCode(fieldErrors.name),
        email: firstErrorCode(fieldErrors.email),
        age: firstErrorCode(fieldErrors.age),
      },
      // Sent back so the form can refill what the user typed.
      values,
    };
  }

  // redirect() works by throwing, so it stays outside any try/catch.
  // An action cannot read the [lang] root parameter, so the destination takes
  // the language from the cookie the proxy keeps.
  const locale = await getCookieLocale();
  redirect(
    localizePath(
      locale,
      `/server-actions/validation-and-redirect/demo/welcome?name=${encodeURIComponent(parsed.data.name)}`,
    ),
  );
}
