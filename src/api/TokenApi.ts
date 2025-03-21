import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hansang.o-r.kr/api/', // 기본 URL 설정
});

// 인터셉터 설정
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const tokens = JSON.parse(accessToken);
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

// 응답 인터셉터 설정 (리프레시 토큰 처리)
api.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    if (error.response.status === 401) {
      // 리프레시 토큰을 사용하여 새로운 엑세스 토큰을 발급받습니다.
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await axios.post('/refresh-token', {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        // 새로운 엑세스 토큰으로 요청을 다시 시도합니다.
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config);
      } catch (error: any) {
        if (error.response.status === 401 || error.response.status === 403) {
          // 리프레시 토큰이 만료된 경우, 로그인 페이지로 리디렉션
          handleLogout();
        } else {
          console.error('리프레시 토큰 발급 실패:', error);
        }
      }
    }
    return Promise.reject(error);
  },
);

const handleLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenType');
  localStorage.removeItem('expiresIn');
  window.location.href = '/login';
};

export default api;
export { handleLogout };
