import { apiClient } from "@/lib/api-client";

import type { ResetPasswordPayload } from "./types";

export const resetPasswordRequest = async (payload: ResetPasswordPayload): Promise<void> => {
  await apiClient<unknown>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
