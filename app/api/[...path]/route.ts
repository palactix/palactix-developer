import { NextRequest, NextResponse } from "next/server";

import { forwardToLaravel } from "@/lib/proxy-handler";

type CatchAllRouteContext = {
  params: Promise<{ path: string[] }>;
};

const handleCatchAll = async (
  request: NextRequest,
  context: CatchAllRouteContext,
): Promise<NextResponse> => {
  const { path } = await context.params;
  const targetPath = `${path.join("/")}${request.nextUrl.search}`;

  return forwardToLaravel(request, `/${targetPath}`);
};

export const GET = handleCatchAll;
export const POST = handleCatchAll;
export const PUT = handleCatchAll;
export const PATCH = handleCatchAll;
export const DELETE = handleCatchAll;
export const OPTIONS = handleCatchAll;
export const HEAD = handleCatchAll;
