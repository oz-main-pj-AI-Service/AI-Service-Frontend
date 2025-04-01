import api from '@/api/TokenApi';
import { useAuthStore } from '@/stores/authStore';

const handleLogout = async () => {
  try {
    const response = await api.post(`/user/logout/`);
    console.log('로그아웃 응답 :', response);

    if (response.status === 200) {
      console.log(response.data.message);
      window.location.href = '/sign-in';
      useAuthStore.getState().clearAuth();
      // 로직(.ts) 파일에서 접근하는 경우에는 getState() 메서드를 사용해서 전역 상태, 함수 접근
      // 컴포넌트 (.tsx) 파일에서 접근하는 경우에는  const {accessToken} = useAuthStore() 와 같이 훅으로 접근 가능
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
    // window.location.href = '/sign-in';
  }
};

export { handleLogout };
