export type WebhookStatus = 'active' | 'inactive';
export type DeliveryStatus = 'pending' | 'delivered' | 'failed';

export const WEBHOOK_EVENTS = [
  { value: 'post.publish.succeeded', label: 'Post Publish Succeeded' },
  { value: 'post.publish.failed', label: 'Post Publish Failed' },
] as const;

export type WebhookEventType = (typeof WEBHOOK_EVENTS)[number]['value'];

export interface Webhook {
  id: string;
  app_id: string;
  url: string;
  events: WebhookEventType[];
  status: WebhookStatus;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface WebhookWithSecret extends Webhook {
  secret: string;
}

export interface WebhookDelivery {
  id: string;
  webhook_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  status: DeliveryStatus;
  http_status: number | null;
  response_body: string | null;
  attempt_count: number;
  last_attempted_at: string | null;
  created_at: string;
}

export interface WebhookListResponse {
  data: Webhook[];
}

export interface WebhookResponse {
  data: Webhook;
}

export interface WebhookCreatedResponse {
  data: WebhookWithSecret;
}

export interface RotateSecretResponse {
  data: { secret: string };
}

export interface SendTestResponse {
  data: { delivery_id: string; status: string; message: string };
}

export interface WebhookDeliveriesResponse {
  data: WebhookDelivery[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface CreateWebhookPayload {
  url: string;
  events: WebhookEventType[];
  description?: string;
  status?: WebhookStatus;
}

export interface UpdateWebhookPayload {
  url?: string;
  events?: WebhookEventType[];
  description?: string | null;
  status?: WebhookStatus;
}
