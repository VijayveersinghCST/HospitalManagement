export const AUTH_COOKIE_NAME = "token";

export function jwtDecode(token: string): unknown | null {
  // TODO: decode JWT payload
  return null;
}

/** Client-only: reads the auth cookie set after a successful login. */
export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${AUTH_COOKIE_NAME}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/** Client-only: sets the auth cookie after a successful login. */
export function setAuthToken(token: string, maxAgeSeconds = 60 * 60 * 8): void {
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(
    token
  )}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

/** Client-only: clears the auth cookie on logout. */
export function clearAuthToken(): void {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
}
