import { API_BASE_URL, REQUEST_TIMEOUT_MS } from "@/lib/constants";
import { ApiError, AuthError, RateLimitError, normalizeError } from "@/lib/errors";
import { useAuthStore } from "@/stores/auth-store";

type ApiClientOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
  skipAuthRetry?: boolean;
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
};

const createHeaders = (headers?: HeadersInit): Headers => {
  const nextHeaders = new Headers(headers);
  if (!nextHeaders.has("Accept")) {
    nextHeaders.set("Accept", "application/json");
  }
  return nextHeaders;
};

const buildUrl = (path: string): string => {
  if (!API_BASE_URL) {
    throw new ApiError("Missing NEXT_PUBLIC_API_BASE_URL", 500);
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const toApiError = (status: number, payload: unknown, retryAfterHeader?: string | null): Error => {
  const messageFromPayload =
    typeof payload === "object" && payload !== null && "message" in payload
      ? String((payload as { message?: unknown }).message ?? "")
      : "";

  const message = messageFromPayload || `Request failed with status ${status}`;

  if (status === 401) {
    return new AuthError(message, status, payload);
  }

  if (status === 429) {
    const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : undefined;
    return new RateLimitError(message, Number.isFinite(retryAfter) ? retryAfter : undefined, payload);
  }

  return new ApiError(message, status, payload);
};

export const apiClient = async <T>(path: string, options: ApiClientOptions = {}): Promise<T> => {
  const { headers, skipAuthRetry = false, ...restOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const authState = useAuthStore.getState();
    const requestHeaders = createHeaders(headers);

    if (restOptions.body && !(restOptions.body instanceof FormData) && !requestHeaders.has("Content-Type")) {
      requestHeaders.set("Content-Type", "application/json");
    }

    if (authState.accessToken) {
      requestHeaders.set("Authorization", `Bearer ${authState.accessToken}`);
    }

    const response = await fetch(buildUrl(path), {
      ...restOptions,
      headers: requestHeaders,
      credentials: "include",
      signal: controller.signal,
    });

    if (response.status === 401 && !skipAuthRetry) {
      const refreshed = await useAuthStore.getState().attemptSilentRefresh();
      if (refreshed) {
        return apiClient<T>(path, {
          ...options,
          skipAuthRetry: true,
        });
      }

      useAuthStore.getState().clearAccessToken();
      throw new AuthError("Session expired. Please login again.", 401);
    }

    const payload = await parseResponseBody(response);
    if (!response.ok) {
      throw toApiError(response.status, payload, response.headers.get("retry-after"));
    }

    return payload as T;
  } catch (error) {
    throw normalizeError(error);
  } finally {
    clearTimeout(timeoutId);
  }
};

export type { ApiClientOptions };