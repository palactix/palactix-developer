import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEMO_USER_COOKIE = 'palactix_demo_user_id';

export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  if (!request.cookies.has(DEMO_USER_COOKIE)) {
    const userId = 'wd_demo_user_' + Math.random().toString(36).substring(2, 10);
    // No maxAge / expires = session cookie (cleared when browser closes)
    response.cookies.set(DEMO_USER_COOKIE, userId, { httpOnly: true, sameSite: 'lax', path: '/' });
  }

  return response;
}

export const config = {
  matcher: '/tools/publish-widget-demo',
};
