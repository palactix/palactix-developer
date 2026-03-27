const BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

const normalizePath = (path: string): string => {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
};

export const getLaravelUrl = (path: string): string => {
  return `${BASE_URL}${normalizePath(path)}`;
};

export const callLaravelApi = async (path: string, init?: RequestInit): Promise<Response> => {
  const headers = new Headers(init?.headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  headers.set("Accept-Encoding", "identity");

  return fetch(getLaravelUrl(path), {
    ...init,
    headers,
  });
};
