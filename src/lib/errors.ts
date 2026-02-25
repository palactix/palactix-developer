export class ApiError extends Error {
  public readonly status: number;
  public readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export class AuthError extends ApiError {
  constructor(message = "Authentication failed", status = 401, details?: unknown) {
    super(message, status, details);
    this.name = "AuthError";
  }
}

export class RateLimitError extends ApiError {
  public readonly retryAfter?: number;

  constructor(message = "Rate limit exceeded", retryAfter?: number, details?: unknown) {
    super(message, 429, details);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

const resolveMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const candidate = payload as { message?: unknown; error?: unknown };
  if (typeof candidate.message === "string") {
    return candidate.message;
  }
  if (typeof candidate.error === "string") {
    return candidate.error;
  }

  return undefined;
};

export const normalizeError = (error: unknown): Error => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return new ApiError("Request timed out", 408);
    }
    return error;
  }

  if (typeof error === "string") {
    return new Error(error);
  }

  const message = resolveMessage(error) ?? "Unexpected error";
  return new Error(message);
};

export const getErrorMessage = (error: unknown, fallback = "Request failed"): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};