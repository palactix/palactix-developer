"use client";

import { useMutation } from "@tanstack/react-query";

import { getErrorMessage } from "@/lib/errors";
import { notify } from "@/shared/notifications/notifier";

import { forgotPasswordRequest } from "./api";
import type { ForgotPasswordFormValues } from "./types";

type UseForgotPasswordResult = {
  submit: (values: ForgotPasswordFormValues) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
};

export const useForgotPassword = (): UseForgotPasswordResult => {
  const mutation = useMutation<void, Error, ForgotPasswordFormValues>({
    mutationFn: forgotPasswordRequest,
    onSuccess: () => {
      notify.success("Password reset link sent successfully.");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Unable to send reset link"));
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
