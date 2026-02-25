import { create } from "zustand";

import { API_BASE_URL, REQUEST_TIMEOUT_MS } from "@/lib/constants";

type RefreshResponse = {
  access_token: string;
  expires_in: number;
};

type AuthState = {
  accessToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  setAccessToken: (accessToken: string, expiresIn: number) => void;
  clearAccessToken: () => void;
  attemptSilentRefresh: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  expiresAt: null,
  isAuthenticated: false,

  setAccessToken: (accessToken, expiresIn) => {
    const expiresAt = Date.now() + expiresIn * 1000;

    set({
      accessToken,
      expiresAt,
      isAuthenticated: true,
    });
  },

  clearAccessToken: () => {
    set({
      accessToken: null,
      expiresAt: null,
      isAuthenticated: false,
    });
  },

  attemptSilentRefresh: async () => {
    if (!API_BASE_URL) {
      get().clearAccessToken();
      return false;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        get().clearAccessToken();
        return false;
      }

      const data = (await response.json()) as Partial<RefreshResponse>;
      if (typeof data.access_token !== "string" || typeof data.expires_in !== "number") {
        get().clearAccessToken();
        return false;
      }

      get().setAccessToken(data.access_token, data.expires_in);
      return true;
    } catch {
      get().clearAccessToken();
      return false;
    } finally {
      clearTimeout(timeoutId);
    }
  },
}));

export type { AuthState };