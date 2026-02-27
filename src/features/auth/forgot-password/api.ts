import { apiClient } from "@/lib/api-client";

import type { ForgotPasswordPayload } from "./types";

export const forgotPasswordRequest = async (payload: ForgotPasswordPayload): Promise<void> => {
  await apiClient<unknown>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
