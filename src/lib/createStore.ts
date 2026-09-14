"use client";

import { useSyncExternalStore } from "react";

type Listener = () => void;
type Setter<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

/**
 * Tiny mock of zustand's `create()`, so store files don't need the
 * zustand package. Usage is identical to before:
 *
 *   const useAuthStore = createStore<AuthState>((set) => ({ ... }));
 *   const setUser = useAuthStore((s) => s.setUser);
 */
export function createStore<T>(initializer: (set: Setter<T>) => T) {
    let state: T;
    const listeners = new Set<Listener>();

    const setState: Setter<T> = (partial) => {
        const next = typeof partial === "function" ? (partial as (state: T) => Partial<T>)(state) : partial;
        state = { ...state, ...next };
        listeners.forEach((listener) => listener());
    };

    state = initializer(setState);

    const getState = () => state;
    const subscribe = (listener: Listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    return function useStore<U>(selector: (state: T) => U): U {
        return useSyncExternalStore(subscribe, () => selector(getState()), () => selector(getState()));
    };
}