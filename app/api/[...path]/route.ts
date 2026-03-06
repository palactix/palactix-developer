import { NextRequest, NextResponse } from "next/server";

import { forwardToLaravel, forwardToLaravelPublic } from "@/lib/proxy-handler";

/** Path prefixes that can be read without authentication */
const PUBLIC_GET_PREFIXES = ["/blog/"];

const isPublicGetRequest = (path: string, method: string): boolean =>
  method === "GET" && PUBLIC_GET_PREFIXES.some((prefix) => `/${path}`.startsWith(prefix));

type CatchAllRouteContext = {
  params: Promise<{ path: string[] }>;
};

const handleCatchAll = async (
  request: NextRequest,
  context: CatchAllRouteContext,
): Promise<NextResponse> => {
  const { path } = await context.params;
  const targetPath = `${path.join("/")}${request.nextUrl.search}`;

  if (isPublicGetRequest(targetPath, request.method)) {
    return forwardToLaravelPublic(request, `/${targetPath}`);
  }

  return forwardToLaravel(request, `/${targetPath}`);
};

export const GET = handleCatchAll;
export const POST = handleCatchAll;
export const PUT = handleCatchAll;
export const PATCH = handleCatchAll;
export const DELETE = handleCatchAll;
export const OPTIONS = handleCatchAll;
export const HEAD = handleCatchAll;
