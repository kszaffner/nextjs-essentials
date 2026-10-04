export type SignupFieldName = "name" | "email" | "age";

export type SignupValues = Record<SignupFieldName, string>;

// An expected failure (the user typed something invalid) is data the form
// renders, not an exception. A success never reaches the client as state: the
// action redirects instead.
export type SignupState =
  | { status: "idle" }
  | {
      status: "invalid";
      fieldErrors: Partial<Record<SignupFieldName, string>>;
      values: SignupValues;
    };

export const initialSignupState: SignupState = { status: "idle" };
