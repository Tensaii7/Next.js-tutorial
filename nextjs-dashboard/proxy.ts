import { auth } from '@/auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
  if (isOnDashboard) {
    if (isLoggedIn) return;
    const loginUrl = nextUrl.clone();
    loginUrl.pathname = '/login';
    return Response.redirect(loginUrl);
  } else if (isLoggedIn && nextUrl.pathname === '/login') {
    const dashboardUrl = nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    return Response.redirect(dashboardUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
