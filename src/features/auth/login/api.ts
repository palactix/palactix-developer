import { apiClient } from "@/lib/api-client";

import type { LoginInput, LoginResponse } from "./types";

export const loginRequest = async (data: LoginInput): Promise<LoginResponse> => {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    skipAuthRetry: true,
  });
};