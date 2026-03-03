import { apiClient } from "@/lib/api-client";
import { DeveloperAppResponse, DeveloperAppsResponse, CreateAppPayload, AddCredentialsPayload, DeveloperAppInfoResponse, AddCredentialResponse } from "./developer-app.types";

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

export const showApp = async (id: string): Promise<DeveloperAppInfoResponse> => {
   return apiClient<DeveloperAppInfoResponse>(`/developer/apps/${id}`);
};

export const AddCredentials = async (appId: string, payload: AddCredentialsPayload): Promise<AddCredentialResponse> => {
   return apiClient<AddCredentialResponse>(`/developer/apps/${appId}/integrations`, {
      method: "POST",
      body: JSON.stringify(payload),
   });
}

export const updateCredentials = async (appId: string, integrationId: string, payload: AddCredentialsPayload): Promise<AddCredentialResponse> => {
   return apiClient<AddCredentialResponse>(`/developer/apps/${appId}/integrations/${integrationId}`, {
      method: "POST",
      body: JSON.stringify(payload),
   });
}