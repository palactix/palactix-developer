import { apiClient } from "@/lib/api-client";
import type {
  CreateWebhookPayload,
  RotateSecretResponse,
  SendTestResponse,
  UpdateWebhookPayload,
  WebhookCreatedResponse,
  WebhookDeliveriesResponse,
  WebhookListResponse,
  WebhookResponse,
} from "./webhooks.types";

export const listWebhooks = (appId: string): Promise<WebhookListResponse> =>
  apiClient<WebhookListResponse>(`/developer/apps/${appId}/webhooks`);

export const createWebhook = (
  appId: string,
  payload: CreateWebhookPayload,
): Promise<WebhookCreatedResponse> =>
  apiClient<WebhookCreatedResponse>(`/developer/apps/${appId}/webhooks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateWebhook = (
  appId: string,
  webhookId: string,
  payload: UpdateWebhookPayload,
): Promise<WebhookResponse> =>
  apiClient<WebhookResponse>(`/developer/apps/${appId}/webhooks/${webhookId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteWebhook = (appId: string, webhookId: string): Promise<void> =>
  apiClient<void>(`/developer/apps/${appId}/webhooks/${webhookId}`, {
    method: "DELETE",
  });

export const rotateWebhookSecret = (
  appId: string,
  webhookId: string,
): Promise<RotateSecretResponse> =>
  apiClient<RotateSecretResponse>(
    `/developer/apps/${appId}/webhooks/${webhookId}/secret`,
    { method: "POST" },
  );

export const sendTestDelivery = (
  appId: string,
  webhookId: string,
): Promise<SendTestResponse> =>
  apiClient<SendTestResponse>(
    `/developer/apps/${appId}/webhooks/${webhookId}/test`,
    { method: "POST" },
  );

export const listDeliveries = (
  appId: string,
  webhookId: string,
  page = 1,
): Promise<WebhookDeliveriesResponse> =>
  apiClient<WebhookDeliveriesResponse>(
    `/developer/apps/${appId}/webhooks/${webhookId}/deliveries?page=${page}`,
  );
