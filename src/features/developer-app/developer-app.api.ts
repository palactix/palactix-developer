import { apiClient } from "@/lib/api-client";
import { DeveloperAppResponse, DeveloperAppsResponse, CreateAppPayload } from "./developer-app.types";

// ================= API FUNCTIONS =================

export const createApp = async (payload: CreateAppPayload): Promise<DeveloperAppResponse> => {
   const formData = new FormData();
   formData.append("name", payload.name);
   if (payload.logo) {
      formData.append("logo", payload.logo);
   }

   return apiClient<DeveloperAppResponse>("/developer/apps", {
      method: "POST",
      body: formData,
   });
};

export const listApps = async (): Promise<DeveloperAppsResponse> => {
   return apiClient<DeveloperAppsResponse>("/developer/apps");
};

export const showApp = async (id: string): Promise<DeveloperAppResponse> => {
   return apiClient<DeveloperAppResponse>(`/developer/apps/${id}`);
};