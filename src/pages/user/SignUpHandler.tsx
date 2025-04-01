import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/url';
import { useAuthStore } from '@/stores/authStore';

const SignUpHandler = () => {
  // console.log(code);

  const { setAuthData } = useAuthStore();

  const naverSignUp = (code: string) => {
    if (code) {
      // 백엔드로 코드 전송
      axios
        .post(`${API_URL}/user/social-login/naver/callback/`, {
          code,
          // state,
        })
        .then((response) => {
          const data = response.data;
          setAuthData(data);
          // console.log(data);

          // 성공 시 메인 페이지로 이동
          setTimeout(() => {
            window.location.href = '/';
          }, 300);
          if (!data.is_new_user) {
            alert('로그인이 완료되었습니다');
          } else {
            alert('회원가입이 완료되었습니다.');
          }
        })
        .catch((error) => {
          const errors = error.response.data;
          if (errors.code === 'already_registered_portal') {
            alert(errors.error);
            window.location.href = '/sign-in';
          } else {
            alert(errors.error);
            console.error('네이버 로그인 실패', error);
          }
        });
    }
  };

  const googleSignUp = (code: string) => {
    if (code) {
      // 백엔드로 코드 전송
      axios
        .post(`${API_URL}/user/social-login/google/callback/`, {
          code,
        })
        .then((response) => {
          const data = response.data;
          setAuthData(data);
          // handleResponseData(data);
          // 성공 시 메인 페이지로 이동
          setTimeout(() => {
            window.location.href = '/';
          }, 300);
          if (!data.is_new_user) {
            alert('로그인이 완료되었습니다');
          } else {
            alert('회원가입이 완료되었습니다.');
          }
        })
        .catch((error) => {
          const errors = error.response.data;
          if (errors.code === 'already_registered_portal') {
            alert(errors.error);
            window.location.href = '/sign-in';
          } else {
            alert(errors.error);
            console.error('구글 로그인 실패', error);
          }
        });
    }
  };

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const code = urlParams.searchParams.get('code') as string;

    if (urlParams.href.includes('naver')) {
      naverSignUp(code);
    } else if (urlParams.href.includes('google')) {
      googleSignUp(code);
    }
  }, []);

  return <div>로딩 중...</div>;
};

export default SignUpHandler;
