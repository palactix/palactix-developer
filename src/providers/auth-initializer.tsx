"use client";

import { ReactNode, useEffect, useRef } from "react";

import { useAuthStore } from "@/stores/auth-store";

type AuthInitializerProps = {
  children: ReactNode;
};

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const initializedRef = useRef(false);
  const attemptSilentRefresh = useAuthStore((state) => state.attemptSilentRefresh);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;

    if (!useAuthStore.getState().accessToken) {
      void attemptSilentRefresh();
    }
  }, [attemptSilentRefresh]);

  return <>{children}</>;
};