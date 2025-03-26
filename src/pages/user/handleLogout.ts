import api from '@/api/TokenApi';

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

export { handleLogout };
