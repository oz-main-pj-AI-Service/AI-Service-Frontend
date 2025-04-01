import { API_URL } from '@/constants/url';
import { handleLogout } from '@/pages/user/handleLogout';
import axios from 'axios';

//accessToken이 필요한 경우만 사용
const api = axios.create({
  baseURL: API_URL, // 기본 URL 설정
});

// 요청전 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // 실제 로그인용 토큰
    // const accessToken = localStorage.getItem('access_temp'); // 임시 로그인용 토큰
    console.log('토큰', accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      window.location.href = '/sign-in';
      throw new Error('⚠️토큰이 없습니다.');
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

// 응답 인터셉터 설정 (리프레시 토큰 처리)
api.interceptors.response.use(
  //성공
  (response) => response,
  //에러처리
  async (error: any) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      // 리프레시 토큰을 사용하여 새로운 엑세스 토큰을 발급받습니다.
      const errorCode = error.response.data.code;

      switch (errorCode) {
        case 'not_authenticated':
          console.error('⚠️인증되지 않은 사용자');
          window.location.href = '/sign-in';
          return Promise.reject(error);

        case 'token_not_valid':
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            try {
              const response = await api.post('/user/refresh-token', {
                refreshToken,
              });
              const newAccessToken = response.data.accessToken;
              localStorage.setItem('accessToken', newAccessToken);
              api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            } catch (refreshError: any) {
              console.error('리프레시 토큰 발급 실패:', refreshError);
              handleLogout();
              return Promise.reject(refreshError);
            }
          }
          break;

        default:
          console.error('알수 없는 인증 오류', error.response.data);
          handleLogout();
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
