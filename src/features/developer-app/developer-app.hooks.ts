import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCredentials, createApp, generateAppCredentials, listApps, showApp, updateCredentials } from "./developer-app.api";
import { AddCredentialsPayload, CreateAppPayload } from "./developer-app.types";
import { notify } from "@/shared/notifications/notifier";

// ================= QUERY HOOKS =================

export const useApps = () => {
  return useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      const response = await listApps();
      return response.data;
    },
  });
};

export const useApp = (id: string) => {
  return useQuery({
    queryKey: ["app", id],
    queryFn: async () => {
      const response = await showApp(id);
      return response;
    },
    enabled: !!id,
  });
};

// ================= MUTATION HOOKS =================

export const useCreateApp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAppPayload) => createApp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });
};

export const useAddCredentials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appId, payload }: { appId: string; payload: AddCredentialsPayload }) =>
      AddCredentials(appId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["app", variables.appId] });
      notify.success("Platform credentials added");
    },
    onError: () => {
      notify.error("Failed to add platform credentials");
    },
  });
};

export const useUpdateCredentials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      appId,
      integrationId,
      payload,
    }: {
      appId: string;
      integrationId: string;
      payload: AddCredentialsPayload;
    }) => updateCredentials(appId, integrationId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["app", variables.appId] });
      notify.success("Platform credentials updated");
    },
    onError: () => {
      notify.error("Failed to update platform credentials");
    },
  });
};

export const useGenerateAppCredentials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appId }: { appId: string }) => generateAppCredentials(appId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["app", variables.appId] });
      notify.success("App credentials generated");
    },
    onError: () => {
      notify.error("Failed to generate app credentials");
    },
  });
};