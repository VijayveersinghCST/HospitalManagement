import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "token"; // must match lib/auth.ts
const PUBLIC_PATHS = ["/login"];
const DEFAULT_AUTHED_ROUTE = "/dashboard";

function isTokenValid(token?: string): boolean {
  if (!token) return false;
  try {
    const part = token.split(".")[1];
    if (!part) return false;
    const b64 = part
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(Math.ceil(part.length / 4) * 4, "=");
    const payload = JSON.parse(atob(b64));
    return !(typeof payload.exp === "number" && payload.exp * 1000 <= Date.now());
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const authed = isTokenValid(token);
  const isPublic = PUBLIC_PATHS.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (!authed && !isPublic) {
    const url = new URL("/login", req.url);
    if (pathname !== "/") url.searchParams.set("next", pathname + search);
    const res = NextResponse.redirect(url);
    if (token) res.cookies.delete(COOKIE_NAME); // drop stale/expired cookie
    return res;
  }

  if (authed && isPublic) {
    return NextResponse.redirect(new URL(DEFAULT_AUTHED_ROUTE, req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip API routes, Next internals and static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};