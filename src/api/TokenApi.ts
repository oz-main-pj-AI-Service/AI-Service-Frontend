import { API_URL } from '@/constants/url';
import { handleLogout } from '@/pages/user/handleLogout';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const api = axios.create({
  baseURL: API_URL,
});

// 리프레시 토큰 요청 중복 방지 플래그
let isRefreshing = false;

api.interceptors.request.use(
  (config) => {
    // const accessToken = localStorage.getItem('accessToken');

    const { accessToken } = useAuthStore.getState();

    if (config.url !== '/user/refresh-token/' && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['Content-Type'] = 'application/json';

    // 특정 AI 추천 엔드포인트에만 특수 설정 적용
    const recommendationEndpoints = [
      '/ai/food-recommendation/',
      '/ai/health-recommendation/',
      '/ai/recipe-recommendation/',
    ];

    const shouldApplySpecialConfig =
      recommendationEndpoints.some((endpoint) => config.url?.includes(endpoint)) &&
      !config.url?.includes('/ai/food-result/');

    if (shouldApplySpecialConfig) {
      config.transformResponse = (data) => data;
      config.decompress = false;
      config.maxRedirects = 0;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error?.response?.data?.code;

    // 1. 토큰 만료 케이스 (401 & token_not_valid)
    if (
      error.response?.status === 401 &&
      errorCode === 'token_not_valid' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { refreshToken } = useAuthStore.getState();
          const response = await api.post('/user/refresh-token/', {
            refresh_token: refreshToken, // 필드명 수정
          });

          const newData = {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token || refreshToken, // 새 리프레시 토큰 없을 경우 기존 값 유지
            token_type: response.data.token_type || 'Bearer',
            expires_in: response.data.expires_in || 3600,
            admin: response.data.admin,
          };

          useAuthStore.getState().setAuthData(newData);
          originalRequest.headers.Authorization = `Bearer ${newData.access_token}`;
          isRefreshing = false;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('토큰 갱신 실패:', refreshError);
          useAuthStore.getState().clearAuth();
          handleLogout();
          return Promise.reject(refreshError);
        }
      }
    }

    // 2. 미인증 사용자 케이스
    if (errorCode === 'not_authenticated') {
      useAuthStore.getState().clearAuth();
      window.location.href = '/sign-in';
    }

    // 3. 토큰 없는 경우
    if (!useAuthStore.getState().accessToken) {
      window.location.href = '/sign-in';
    }

    return Promise.reject(error);
  },
);

export default api;
