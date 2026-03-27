import { apiClient } from "@/lib/api-client";
import { MeResponse } from "./auth.types";

export const getMe = async (): Promise<MeResponse> => {
  return apiClient<MeResponse>("auth/me");
};
