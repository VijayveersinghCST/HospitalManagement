// Standard  →  /api/v1  (auth, dashboard, users, ...)
const BASE_V1 = process.env.NEXT_PUBLIC_API_BASE_V1 ?? "";

export const API_ENDPOINTS = {
    AUTH_LOGIN: `${BASE_V1}/auth/login`,
    AUTH_LOGOUT: `${BASE_V1}/auth/logout`,
    AUTH_VERIFY: `${BASE_V1}/auth/verify`,
    AUTH_REFRESH: `${BASE_V1}/auth/refresh`,
} as const;

export const API_BASE_V1 = BASE_V1;