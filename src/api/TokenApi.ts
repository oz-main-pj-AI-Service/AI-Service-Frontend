import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hansang.o-r.kr/api/', // 기본 URL 설정
});

// 인터셉터 설정
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('tokens');
  if (accessToken) {
    const tokens = JSON.parse(accessToken);
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

// 응답 인터셉터 설정 (리프레시 토큰 처리)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // 리프레시 토큰을 사용하여 새로운 엑세스 토큰을 발급받습니다.
      const tokens = localStorage.getItem('tokens');
      const refreshToken = tokens ? JSON.parse(tokens).refreshToken : null;
      try {
        const response = await axios.post('/refresh-token', {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem(
          'tokens',
          JSON.stringify({
            ...JSON.parse(localStorage.getItem('tokens') || '{}'),
            accessToken: newAccessToken,
          }),
        );
        // 새로운 엑세스 토큰으로 요청을 다시 시도합니다.
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config);
      } catch (error) {
        console.error('리프레시 토큰 발급 실패:', error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
