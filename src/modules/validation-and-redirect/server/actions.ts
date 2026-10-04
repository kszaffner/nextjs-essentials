"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { localizePath } from "@/shared/i18n";
import { getCookieLocale } from "@/shared/i18n/cookie";
import type { SignupState } from "../signupState";
import { SignupSchema } from "./signupSchema";

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
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
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        age: fieldErrors.age?.[0],
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
