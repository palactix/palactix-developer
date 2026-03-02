import { apiClient } from "@/lib/api-client";
import { PlatformsResponse } from "./platform.types";

export const listPlatforms = async (): Promise<PlatformsResponse> => {
  return apiClient<PlatformsResponse>("platforms");
};