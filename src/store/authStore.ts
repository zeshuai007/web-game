/**
 * 认证 Store
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authApi from '../api/authApi';
import type { User } from '../types/index';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  // Actions
  login: (username: string, password: string) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const result = await authApi.login({ username, password });
          localStorage.setItem('auth_token', result.token);
          set({ isLoggedIn: true, user: result.user, token: result.token, loading: false });
        } catch (err) {
          set({ loading: false, error: (err as Error).message });
        }
      },

      guestLogin: async () => {
        set({ loading: true, error: null });
        try {
          const result = await authApi.guestLogin();
          localStorage.setItem('auth_token', result.token);
          set({ isLoggedIn: true, user: result.user, token: result.token, loading: false });
        } catch (err) {
          set({ loading: false, error: (err as Error).message });
        }
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        set({ isLoggedIn: false, user: null, token: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn, user: state.user, token: state.token }),
    },
  ),
);
