import { apiClient } from "@/lib/api-client";
import type {
  CreateWidgetPayload,
  RotateSecretResponse,
  UpdateWidgetPayload,
  WidgetListResponse,
  WidgetResponse,
} from "./widget.types";

export const listWidgets = async (appId: string): Promise<WidgetListResponse> => {
  return apiClient<WidgetListResponse>(`/developer/apps/${appId}/widgets`);
};

export const createWidget = async (
  appId: string,
  payload: CreateWidgetPayload,
): Promise<WidgetResponse> => {
  return apiClient<WidgetResponse>(`/developer/apps/${appId}/widgets`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateWidget = async (
  appId: string,
  widgetId: string,
  payload: UpdateWidgetPayload,
): Promise<WidgetResponse> => {
  return apiClient<WidgetResponse>(`/developer/apps/${appId}/widgets/${widgetId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const rotateWidgetSecret = async (
  appId: string,
  widgetId: string,
): Promise<RotateSecretResponse> => {
  return apiClient<RotateSecretResponse>(
    `/developer/apps/${appId}/widgets/${widgetId}/secret`,
    { method: "POST" },
  );
};
