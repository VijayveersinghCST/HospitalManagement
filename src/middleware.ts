import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

// Routes that don't require a logged-in user. "/" handles its own
// redirect (to /login or /dashboard) once it reads the cookie itself.
const PUBLIC_PATHS = ["/login", "/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  if (!token && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // TODO: verify JWT + role-based access checks here

  return NextResponse.next();
}

export const config = {
  // Run on every route except static assets, so any real page (including
  // ones added later) is protected by default.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};
