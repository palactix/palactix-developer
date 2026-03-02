import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createApp, listApps, showApp } from "./developer-app.api";
import { DeveloperApp, CreateAppPayload } from "./developer-app.types";

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
      return response.data;
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