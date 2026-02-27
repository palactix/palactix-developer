import { NextResponse } from "next/server";

import { setAuthSession } from "@/lib/auth-session";
import { callLaravelApi } from "@/lib/server-api";

type LoginRequestBody = {
  email: string;
  password: string;
};

type LaravelLoginResponse = {
  access_token: string;
  expires_in: number;
  message: string;
  authenticated: boolean;
};

export const POST = async (request: Request): Promise<NextResponse> => {
  let body: LoginRequestBody;

  try {
    body = (await request.json()) as LoginRequestBody;
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  if (!body.email || !body.password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  const upstreamResponse = await callLaravelApi("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = (await upstreamResponse.json()) as LaravelLoginResponse;

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      payload,
      { status: upstreamResponse.status },
    );
  }

  if (typeof payload.access_token !== "string" || typeof payload.expires_in !== "number") {
    return NextResponse.json({ message: "Invalid auth response" }, { status: 502 });
  }

  const response = NextResponse.json({ authenticated: payload.authenticated }, { status: 200 });
  setAuthSession(response, {
    accessToken: payload.access_token,
    expiresIn: payload.expires_in,
  });

  return response;
};
