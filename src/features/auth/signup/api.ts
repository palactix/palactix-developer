import type { SignupInput, SignupResponse } from "./types";

type ErrorResponse = {
  message?: string;
};

export const signupRequest = async (data: SignupInput): Promise<SignupResponse> => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = (await response.json()) as SignupResponse | ErrorResponse;

  if (!response.ok) {
    const message = "message" in payload ? payload.message : undefined;
    throw new Error(message ?? "Signup failed");
  }

  return payload as SignupResponse;
};
