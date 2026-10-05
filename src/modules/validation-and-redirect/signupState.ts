export type SignupFieldName = "name" | "email" | "age";

export type SignupValues = Record<SignupFieldName, string>;

// The schema reports a code, not a sentence: the UI picks the wording in the
// reader's language, and the server stays language-independent.
export const signupErrorCodes = [
  "nameTooShort",
  "nameTooLong",
  "emailInvalid",
  "ageRequired",
  "ageNotNumber",
  "ageNotInteger",
  "ageTooYoung",
  "ageTooOld",
  "invalidValue",
] as const;

export type SignupErrorCode = (typeof signupErrorCodes)[number];

export function isSignupErrorCode(value: unknown): value is SignupErrorCode {
  return signupErrorCodes.some((code) => code === value);
}

// An expected failure (the user typed something invalid) is data the form
// renders, not an exception. A success never reaches the client as state: the
// action redirects instead.
export type SignupState =
  | { status: "idle" }
  | {
      status: "invalid";
      fieldErrors: Partial<Record<SignupFieldName, SignupErrorCode>>;
      values: SignupValues;
    };

export const initialSignupState: SignupState = { status: "idle" };
