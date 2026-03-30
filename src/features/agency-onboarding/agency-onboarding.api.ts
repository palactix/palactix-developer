import { apiClient } from "@/lib/api-client";

export interface UsernameCheckResponse {
  available: boolean;
  username: string;
  message?: string;
}

export const checkUsernameAvailability = async (username: string): Promise<UsernameCheckResponse> => {
  return apiClient<UsernameCheckResponse>("/agency/workspace/check-username", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
};

export const storeUsername = async (username: string): Promise<void> => {
  await apiClient<void>("/agency/workspace/username", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
};

