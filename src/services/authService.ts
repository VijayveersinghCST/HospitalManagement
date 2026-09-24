import { API_BASE_V1, API_ENDPOINTS } from "@/lib/endpoints";
import { authFetch } from "@/lib/authFetch";
import { clearSession, setAuthToken } from "@/lib/auth";
import type { AuthUser } from "@/store/auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

/** Login: validates response, persists token, returns user for the store. */
export async function loginAPI(
    credentials: LoginCredentials
): Promise<LoginResult> {
  if (!API_BASE_V1) {
    // Without this guard, API_ENDPOINTS.AUTH_LOGIN silently becomes a
    // relative path ("/auth/login"), which fetches this Next.js app
    // itself instead of the backend — middleware then redirects it to
    // /login, and the failure shows up later as a confusing
    // "no token returned" error instead of here, where the real cause is.
    throw new Error(
        "API base URL is not configured. Set NEXT_PUBLIC_API_BASE_V1 in .env.local and restart the dev server."
    );
  }

  let res: Response;
  try {
    res = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });
  } catch {
    throw new Error(
        "Unable to connect to server. Please check your internet connection."
    );
  }

  const data = await res.json().catch(() => null);

  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || "Invalid email or password");
  }

  const token: string | undefined = data?.data?.token;
  if (!token) {
    throw new Error("Login succeeded but no token was returned.");
  }

  setAuthToken(token);

  const user: AuthUser = data?.data?.user ?? { email: credentials.email };
  return { token, user };
}

/** Logout: tells the server, but always clears the local session. */
export async function logoutAPI(): Promise<void> {
  try {
    await authFetch(API_ENDPOINTS.AUTH_LOGOUT, { method: "POST" });
  } catch {
    // Server logout failed or session already expired — still log out locally
  } finally {
    clearSession();
  }
}

/** Verify active token. */
export async function verifyToken() {
  const res = await authFetch(API_ENDPOINTS.AUTH_VERIFY);
  if (!res.ok) throw new Error("Token verification failed");
  return res.json();
}

/** Refresh token. */
export async function refreshToken() {
  const res = await authFetch(API_ENDPOINTS.AUTH_REFRESH, { method: "POST" });
  if (!res.ok) throw new Error("Token refresh failed");

  const data = await res.json();
  const token = data?.token ?? data?.data?.token;
  if (token) setAuthToken(token);
  return data;
}