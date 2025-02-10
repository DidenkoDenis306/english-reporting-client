import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { cookies } = req;

  console.log('Middleware triggered for:', req.nextUrl.pathname);

  const accessToken = cookies.get('accessToken');
  console.log('Access token:', accessToken);

  const loginUrl = new URL('/login', req.nextUrl.origin);
  const dashboardUrl = new URL('/dashboard', req.nextUrl.origin);

  if (!accessToken && req.nextUrl.pathname !== '/login') {
    console.log('No token, redirecting to login');
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && req.nextUrl.pathname === '/') {
    console.log('Redirecting to dashboard');
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
