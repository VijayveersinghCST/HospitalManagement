import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
    email: string;
    /** Role id matching a Role.id in store/permissions.ts, e.g. "doctor", "nurse". */
    role?: string;
    [key: string]: unknown;
}

interface AuthState {
    user: AuthUser | null;
    setUser: (user: AuthUser) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        { name: "hms-auth" }
    )
);