import { clearSession, getAuthToken, isTokenValid } from "@/lib/auth";

function redirectToLogin() {
    clearSession();
    if (typeof window === "undefined") return;

    const { pathname, search } = window.location;
    if (pathname.startsWith("/login")) return;

    const next = encodeURIComponent(pathname + search);
    window.location.href = `/login?next=${next}`;
}

/**
 * fetch wrapper for authenticated API calls.
 * Throws Error("SESSION_EXPIRED") after redirecting when the session is invalid.
 */
export async function authFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getAuthToken();

    if (!token || !isTokenValid(token)) {
        redirectToLogin();
        throw new Error("SESSION_EXPIRED");
    }

    const isFormData = options.body instanceof FormData;

    let response: Response;
    try {
        response = await fetch(url, {
            ...options,
            headers: {
                // Browser sets Content-Type (with boundary) for FormData
                ...(!isFormData && { "Content-Type": "application/json" }),
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                ...(options.headers as Record<string, string> | undefined),
            },
        });
    } catch {
        throw new Error("Network error — please check your connection and try again.");
    }

    if (response.status === 401) {
        redirectToLogin();
        throw new Error("SESSION_EXPIRED");
    }

    return response;
}