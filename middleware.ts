import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { cookies } = req;
  const accessToken = cookies.get('accessToken');

  const loginUrl = new URL('/login', req.nextUrl.origin);
  const dashboardUrl = new URL('/dashboard', req.nextUrl.origin);

  console.log('heelo');

  if (req.nextUrl.pathname === '/') {
    if (!accessToken) {
      return NextResponse.redirect(loginUrl);
    } else {
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*', '/dashboard'],
};
