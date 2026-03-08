import { NextResponse } from "next/server";
import { setAuthSession } from "@/lib/auth-session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get("access_token");
  const expiresIn = url.searchParams.get("expires_in");
  const redirectUrl = url.searchParams.get("redirect_url") || "/";

  if (!accessToken) {
    return NextResponse.redirect("/auth/login");
  }

  const response = NextResponse.redirect(redirectUrl);
  setAuthSession(response, {
    accessToken,
    expiresIn: expiresIn ? Number(expiresIn) : 2592000,
  });
  return response;
}
