import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/', '/post']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();
  const token = request.cookies.get('@token')?.value;

  const isAuthRoutes = AUTH_ROUTES.includes(pathname);

  const isPublicRoutes =
    pathname === '/' || 
    PUBLIC_ROUTES.some((route) =>
      route !== '/' ? pathname.startsWith(route + '/')
     || pathname === route : false
    );

  const isAuthenticated = !!token;

  if (isAuthRoutes && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isAuthRoutes && !isAuthenticated && !isPublicRoutes) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
