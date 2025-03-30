// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TokenData = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
};

type AuthState = TokenData & {
  setAuthData: (data: TokenData) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: '',
      refreshToken: '',
      tokenType: '',
      expiresIn: 0,
      setAuthData: (data) => set({ ...data }),
      clearAuth: () =>
        set({
          accessToken: '',
          refreshToken: '',
          tokenType: '',
          expiresIn: 0,
        }),
    }),
    {
      name: 'auth-storage',
      // 필요시 특정 필드만 저장하도록 선택 가능
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        tokenType: state.tokenType,
        expiresIn: state.expiresIn,
      }),
    },
  ),
);

export type { TokenData };
