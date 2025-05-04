import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { cookies } = req;

  const accessToken = cookies.get('accessToken');

  const loginUrl = new URL('/login', req.nextUrl.origin);
  const dashboardUrl = new URL('/dashboard', req.nextUrl.origin);

  if (!accessToken && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
