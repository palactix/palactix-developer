import { NextRequest, NextResponse } from "next/server";

import { clearAuthSession, readAccessToken } from "@/lib/auth-session";
import { callLaravelApi } from "@/lib/server-api";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const accessToken = readAccessToken(request);

  if (accessToken) {
    await callLaravelApi("/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).catch(() => undefined);
  }

  const response = NextResponse.json({ success: true }, { status: 200 });
  clearAuthSession(response);
  return response;
};
