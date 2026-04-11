"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/shared/notifications/notifier";
import { getErrorMessage } from "@/lib/errors";
import {
  createWidget,
  listWidgets,
  rotateWidgetSecret,
  updateWidget,
} from "./widget.api";
import type { CreateWidgetPayload, UpdateWidgetPayload } from "./widget.types";

const widgetKeys = {
  list: (appId: string) => ["widgets", appId] as const,
};

export const useWidgets = (appId: string) => {
  return useQuery({
    queryKey: widgetKeys.list(appId),
    queryFn: () => listWidgets(appId),
    select: (res) => res.data,
    enabled: !!appId,
    staleTime: 60_000,
    retry: 1,
  });
};

export const useEnableWidget = (appId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWidgetPayload) => createWidget(appId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: widgetKeys.list(appId) });
    },
    onError: (err) => {
      notify.error(getErrorMessage(err));
    },
  });
};

export const useUpdateWidgetOrigins = (appId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ widgetId, payload }: { widgetId: string; payload: UpdateWidgetPayload }) =>
      updateWidget(appId, widgetId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: widgetKeys.list(appId) });
      notify.success("Allowed origins saved.");
    },
    onError: (err) => {
      notify.error(getErrorMessage(err));
    },
  });
};

export const useUpdateWidgetPlatforms = (appId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ widgetId, payload }: { widgetId: string; payload: UpdateWidgetPayload }) =>
      updateWidget(appId, widgetId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: widgetKeys.list(appId) });
      notify.success("Enabled platforms saved.");
    },
    onError: (err) => {
      notify.error(getErrorMessage(err));
    },
  });
};

export const useRotateWidgetSecret = (appId: string) => {
  return useMutation({
    mutationFn: (widgetId: string) => rotateWidgetSecret(appId, widgetId),
    onError: (err) => {
      notify.error(getErrorMessage(err));
    },
  });
};
