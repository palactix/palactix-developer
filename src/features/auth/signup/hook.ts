"use client";

import { useMutation } from "@tanstack/react-query";

import { notify } from "@/shared/notifications/notifier";

import { signupRequest } from "./api";
import type { SignupFormValues, SignupResponse, SignupType } from "./types";

type UseSignupReturn = {
  submit: (values: SignupFormValues) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
};

export const useSignup = (type: SignupType): UseSignupReturn => {
  const mutation = useMutation<SignupResponse, Error, SignupFormValues>({
    mutationFn: (values) =>
      signupRequest({
        ...values,
        type,
      }),
    onSuccess: () => {
      notify.success("Account created successfully");
    },
    onError: (error) => {
      notify.error(error.message);
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
