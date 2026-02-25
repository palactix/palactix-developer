import { NextRequest, NextResponse } from "next/server";

import { clearAuthSession, readAccessToken } from "@/lib/auth-session";
import { callLaravelApi } from "@/lib/server-api";

const HOP_BY_HOP_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "cookie",
  "authorization",
]);

const shouldForwardBody = (method: string): boolean => {
  return !["GET", "HEAD"].includes(method.toUpperCase());
};

const createForwardHeaders = (request: NextRequest, token: string): Headers => {
  const headers = new Headers();

  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  return headers;
};

const createClientResponse = async (upstreamResponse: Response): Promise<NextResponse> => {
  const body = await upstreamResponse.arrayBuffer();
  const responseHeaders = new Headers();

  upstreamResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "set-cookie") {
      responseHeaders.set(key, value);
    }
  });

  return new NextResponse(body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
};

export const forwardToLaravel = async (request: NextRequest, path: string): Promise<NextResponse> => {
  const accessToken = readAccessToken(request);
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const method = request.method.toUpperCase();
  const headers = createForwardHeaders(request, accessToken);
  const body = shouldForwardBody(method) ? await request.arrayBuffer() : undefined;

  const upstreamResponse = await callLaravelApi(path, {
    method,
    headers,
    body,
  });

  if (upstreamResponse.status === 401) {
    const unauthorized = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    clearAuthSession(unauthorized);
    return unauthorized;
  }

  return createClientResponse(upstreamResponse);
};
