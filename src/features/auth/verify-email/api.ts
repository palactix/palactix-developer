import { apiClient } from "@/lib/api-client";

import type { ResendVerificationPayload } from "./types";

export const resendVerificationEmail = async (payload: ResendVerificationPayload): Promise<void> => {
  await apiClient<unknown>("/auth/resend-verification-email", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
