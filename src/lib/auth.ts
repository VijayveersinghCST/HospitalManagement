import { useAuthStore } from "@/store/auth";

const TOKEN_KEY = "token";
export const AUTH_COOKIE_NAME = "token"; // read by middleware.ts and server components — keep in sync
const COOKIE_NAME = AUTH_COOKIE_NAME;
const DEFAULT_MAX_AGE = 60 * 60 * 8; // 8h fallback if token has no exp

type JwtPayload = { exp?: number; [key: string]: unknown };

export function decodeToken(token: string): JwtPayload | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const b64 = part
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(Math.ceil(part.length / 4) * 4, "=");
    return JSON.parse(atob(b64));
  } catch {
    return null;
  }
}

export function isTokenValid(token?: string | null): boolean {
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload) return false;
  if (typeof payload.exp === "number" && payload.exp * 1000 <= Date.now()) {
    return false;
  }
  return true;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);

  const exp = decodeToken(token)?.exp;
  const maxAge = exp
      ? Math.max(exp - Math.floor(Date.now() / 1000), 0)
      : DEFAULT_MAX_AGE;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${COOKIE_NAME}=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

/** Wipe token, cookie and user store in one place. */
export function clearSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
  useAuthStore.getState().clearUser();
}