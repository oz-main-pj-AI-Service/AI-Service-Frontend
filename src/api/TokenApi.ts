import { API_URL } from '@/constants/url';
import axios from 'axios';

const api = axios.create({
  baseURL: API_URL, // 기본 URL 설정
});

// 인터셉터 설정
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('토큰', accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터 설정 (리프레시 토큰 처리)
api.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    if (error.response.status === 400) {
      // 리프레시 토큰을 사용하여 새로운 엑세스 토큰을 발급받습니다.
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await api.post('/refresh-token', {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        // 새로운 엑세스 토큰으로 요청을 다시 시도합니다.
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config);
      } catch (refreshError: any) {
        if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
          // 리프레시 토큰이 만료된 경우, 로그인 페이지로 리디렉션
          handleLogout();
        } else {
          console.error('리프레시 토큰 발급 실패:', refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

const handleLogout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');

    const response = await api.post(`/user/logout/`);
    console.log('로그아웃 응답 :', response);

    if (response.status === 200) {
      console.log(response.data.message);
      window.location.href = '/sign-in';
    }
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          console.error('인증되지 않은 사용자');
          break;
        case 403:
          if (data.code === 'not_verified') {
            console.error('인증되지 않은 이메일');
          } else if (data.code === 'forbidden') {
            console.error('관리자가 아닙니다');
          }
          break;
        default:
          console.error('로그아웃 중 오류 발생:', error);
      }
    } else if (error.request) {
      console.error('서버응답없음');
    } else {
      console.error('요청설정중 오류 발생', error.message); //undefined
    } //undefined
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    window.location.href = '/sign-in';
  }
};

export default api;
export { handleLogout };
