"use client";

import { useMutation } from "@tanstack/react-query";
import { notify } from "@/shared/notifications/notifier";
import { signupRequest } from "./api";
import type { SignupFormValues, SignupResponse, SignupType } from "./types";
import { useRouter } from "next/navigation";

type UseSignupReturn = {
  submit: (values: SignupFormValues) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
};

export const useSignup = (type: SignupType): UseSignupReturn => {
  const router = useRouter();
  const mutation = useMutation<SignupResponse, Error, SignupFormValues>({
    mutationFn: (values) => {
      const { agreeToByok, ...payload } = values;
      void agreeToByok;

      return signupRequest({
        ...payload,
        type,
      });
    },
    onSuccess: (data, values) => {
      notify.success("Account created successfully");
      router.push("/auth/verify-email?email=" + values.email);
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
