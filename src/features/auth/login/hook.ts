"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { getErrorMessage } from "@/lib/errors";
import { notify } from "@/shared/notifications/notifier";

import type { AuthUser, LoginInput } from "./types";
import { loginRequest } from "./api";

export const useLogin = () => {
  const [user, setUser] = useState<AuthUser>(null);

  const mutation = useMutation({
    mutationFn: (input: LoginInput) => loginRequest(input),
    onSuccess: (data) => {
      setUser(data.user);
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
    user,
  };
};