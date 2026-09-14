import { create } from "zustand";

// TODO: replace `any` with a proper User type once the shape is known
interface AuthState {
  user: any | null;
  setUser: (user: any | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
