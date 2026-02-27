"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getErrorMessage } from "@/lib/errors";
import { notify } from "@/shared/notifications/notifier";

import { resetPasswordRequest } from "./api";
import type { ResetPasswordFormValues } from "./types";
import { loginRoute } from "../login";

type UseResetPasswordResult = {
  submit: (values: ResetPasswordFormValues) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
};

export const useResetPassword = (token: string, email: string): UseResetPasswordResult => {
  const router = useRouter();

  const mutation = useMutation<void, Error, ResetPasswordFormValues>({
    mutationFn: (values) =>
      resetPasswordRequest({
        token,
        email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      }),
    onSuccess: () => {
      notify.success("Password reset successfully.");
      router.push(loginRoute);
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Unable to reset password"));
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
