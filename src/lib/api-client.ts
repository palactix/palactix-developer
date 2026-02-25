import { REQUEST_TIMEOUT_MS } from "@/lib/constants";
import { ApiError, AuthError, RateLimitError, normalizeError } from "@/lib/errors";

type ApiClientOptions = Omit<RequestInit, "headers" | "credentials"> & {
  headers?: HeadersInit;
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

const normalizePath = (path: string): string => {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
};

const buildApiUrl = (path: string): string => {
  const normalizedPath = normalizePath(path);

  if (normalizedPath.startsWith("/api/")) {
    return normalizedPath;
  }

  if (normalizedPath.startsWith("/auth/")) {
    return `/api${normalizedPath}`;
  }

  return `/api${normalizedPath}`;
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
  const { headers, ...restOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const requestHeaders = createHeaders(headers);

    if (restOptions.body && !(restOptions.body instanceof FormData) && !requestHeaders.has("Content-Type")) {
      requestHeaders.set("Content-Type", "application/json");
    }

    const response = await fetch(buildApiUrl(path), {
      ...restOptions,
      headers: requestHeaders,
      credentials: "include",
      signal: controller.signal,
    });

    const payload = await parseResponseBody(response);
    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthError("Session expired. Please login again.", 401, payload);
      }
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