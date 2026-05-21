"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/shared/notifications/notifier";
import { getErrorMessage } from "@/lib/errors";
import {
  createWebhook,
  deleteWebhook,
  listDeliveries,
  listWebhooks,
  rotateWebhookSecret,
  sendTestDelivery,
  updateWebhook,
} from "./webhooks.api";
import type { CreateWebhookPayload, UpdateWebhookPayload } from "./webhooks.types";

const webhookKeys = {
  list: (appId: string) => ["webhooks", appId] as const,
  deliveries: (appId: string, webhookId: string, page: number) =>
    ["webhook-deliveries", appId, webhookId, page] as const,
};

export const useWebhooks = (appId: string) =>
  useQuery({
    queryKey: webhookKeys.list(appId),
    queryFn: () => listWebhooks(appId),
    select: (res) => res.data,
    enabled: !!appId,
    staleTime: 30_000,
    retry: 1,
  });

export const useCreateWebhook = (appId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateWebhookPayload) => createWebhook(appId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: webhookKeys.list(appId) });
    },
    onError: (err) => notify.error(getErrorMessage(err)),
  });
};

export const useUpdateWebhook = (appId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ webhookId, payload }: { webhookId: string; payload: UpdateWebhookPayload }) =>
      updateWebhook(appId, webhookId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: webhookKeys.list(appId) });
      notify.success("Webhook updated.");
    },
    onError: (err) => notify.error(getErrorMessage(err)),
  });
};

export const useDeleteWebhook = (appId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (webhookId: string) => deleteWebhook(appId, webhookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: webhookKeys.list(appId) });
      notify.success("Webhook deleted.");
    },
    onError: (err) => notify.error(getErrorMessage(err)),
  });
};

export const useRotateWebhookSecret = (appId: string) =>
  useMutation({
    mutationFn: (webhookId: string) => rotateWebhookSecret(appId, webhookId),
    onError: (err) => notify.error(getErrorMessage(err)),
  });

export const useSendTestDelivery = (appId: string) =>
  useMutation({
    mutationFn: (webhookId: string) => sendTestDelivery(appId, webhookId),
    onSuccess: () => notify.success("Test delivery queued. Check the delivery log shortly."),
    onError: (err) => notify.error(getErrorMessage(err)),
  });

export const useWebhookDeliveries = (appId: string, webhookId: string, page = 1) =>
  useQuery({
    queryKey: webhookKeys.deliveries(appId, webhookId, page),
    queryFn: () => listDeliveries(appId, webhookId, page),
    enabled: !!webhookId,
    staleTime: 15_000,
    retry: 1,
  });
