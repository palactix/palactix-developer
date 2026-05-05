import { apiClient } from "@/lib/api-client";
import { MeResponse } from "./auth.types";

export const getMe = async (): Promise<MeResponse> => {
  return apiClient<MeResponse>("auth/me");
};

export const logout = async (): Promise<void> => {
  await apiClient<void>("auth/logout", { method: "POST" });
};
