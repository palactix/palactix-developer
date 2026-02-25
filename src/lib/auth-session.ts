import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "palactix_access_token";
const EXPIRES_AT_COOKIE = "palactix_expires_at";

const isProduction = process.env.NODE_ENV === "production";

const baseCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  path: "/",
};

export type SessionPayload = {
  accessToken: string;
  expiresIn: number;
};

export const readAccessToken = (request: NextRequest): string | null => {
  return request.cookies.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
};

export const setAuthSession = (response: NextResponse, payload: SessionPayload): void => {
  const expiresAt = Date.now() + payload.expiresIn * 1000;

  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: payload.accessToken,
    maxAge: payload.expiresIn,
    ...baseCookieOptions,
  });

  response.cookies.set({
    name: EXPIRES_AT_COOKIE,
    value: String(expiresAt),
    maxAge: payload.expiresIn,
    ...baseCookieOptions,
  });
};

export const clearAuthSession = (response: NextResponse): void => {
  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: "",
    maxAge: 0,
    ...baseCookieOptions,
  });

  response.cookies.set({
    name: EXPIRES_AT_COOKIE,
    value: "",
    maxAge: 0,
    ...baseCookieOptions,
  });
};
