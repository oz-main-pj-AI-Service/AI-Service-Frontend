// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ResponseData = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  // isLoginUser: boolean;
};

type TokenData = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  // isLoginUser: boolean;
};

type AuthState = TokenData & {
  setAuthData: (data: ResponseData) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: '',
      refreshToken: '',
      tokenType: '',
      expiresIn: 0,
      // isLoginUser: false,
      setAuthData: (data) =>
        set({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          tokenType: data.token_type,
          expiresIn: data.expires_in,
        }),
      clearAuth: () =>
        set({
          accessToken: '',
          refreshToken: '',
          tokenType: '',
          expiresIn: 0,
          // isLoginUser: false,
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
        // isLoginUser: state.isLoginUser,
      }),
    },
  ),
);

export type { TokenData };
