import { apiClient } from "@/lib/api-client";
import type { User } from "@/types/user";

export const getProfile = async (): Promise<User> => {
  return apiClient("/me", {
    method: "GET",
  });
};
