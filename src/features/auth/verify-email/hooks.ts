"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ApiError, getErrorMessage } from "@/lib/errors";
import { notify } from "@/shared/notifications/notifier";

import { RESEND_COOLDOWN_SECONDS } from "./constants";
import { resendVerificationEmail } from "./api";
import type { ResendVerificationPayload, ValidationErrorResponse } from "./types";

type UseResendVerificationEmailOptions = {
  onSuccess?: () => void;
};

const hasVerifiedValidationError = (details: unknown): details is ValidationErrorResponse => {
  if (!details || typeof details !== "object") {
    return false;
  }

  const candidate = details as ValidationErrorResponse;
  return Boolean(candidate.errors?.verified?.length);
};

// Detects Laravel-style 422 validation errors for unverified email to drive login UX.
export const isUnverifiedEmailError = (error: unknown): boolean => {
  if (!(error instanceof ApiError)) {
    return false;
  }

  return error.status === 422 && hasVerifiedValidationError(error.details);
};

export const useResendVerificationEmail = (
  options?: UseResendVerificationEmailOptions,
): {
  resend: (payload: ResendVerificationPayload) => Promise<void>;
  isPending: boolean;
} => {
  const mutation = useMutation<void, Error, ResendVerificationPayload>({
    mutationFn: resendVerificationEmail,
    onSuccess: () => {
      notify.success("Verification email sent successfully.");
      options?.onSuccess?.();
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Unable to resend verification email"));
    },
  });

  return {
    resend: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};

export const useResendCooldown = (
  durationInSeconds: number = RESEND_COOLDOWN_SECONDS,
): {
  canResend: boolean;
  secondsLeft: number;
  startCooldown: () => void;
} => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startCooldown = useCallback(() => {
    stopTimer();
    setSecondsLeft(durationInSeconds);
  }, [durationInSeconds, stopTimer]);

  // Runs a one-second interval while cooldown is active and stops automatically at zero.
  useEffect(() => {
    if (secondsLeft <= 0) {
      stopTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          stopTimer();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return stopTimer;
  }, [secondsLeft, stopTimer]);

  const canResend = useMemo(() => secondsLeft === 0, [secondsLeft]);

  return {
    canResend,
    secondsLeft,
    startCooldown,
  };
};
