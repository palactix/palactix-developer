"use client";

import { useMutation } from "@tanstack/react-query";

import { getErrorMessage } from "@/lib/errors";
import { notify } from "@/shared/notifications/notifier";
import { useAuthStore } from "@/stores/auth-store";

import { loginRequest } from "./api";
import type { LoginInput } from "./types";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const mutation = useMutation({
    mutationFn: (input: LoginInput) => loginRequest(input),
    onSuccess: (data) => {
      setAccessToken(data.access_token, data.expires_in);
      notify.success("Logged in successfully");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Unable to login"));
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};