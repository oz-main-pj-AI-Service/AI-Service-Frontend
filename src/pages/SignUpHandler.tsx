import { useEffect } from 'react';
import axios from 'axios';

const SignUpHandler = () => {
  // console.log(code);

  const naverSignUp = (code: string) => {
    if (code) {
      // 백엔드로 코드 전송
      axios
        .post('https://hansang.o-r.kr/api/user/social-login/naver/callback/', {
          code,
          // state,
        })
        .then((response) => {
          const data = response.data;
          localStorage.setItem('tokens', JSON.stringify(data));
          //이거 엑세스토큰, 리프레시토큰, 토큰스타일, 유효기간 분리하게 해야할지도?
          window.location.href = '/';
        })
        .catch((error) => {
          console.error('네이버 로그인 실패', error);
        });
    }
  };

  const googleSignUp = (code: string) => {
    if (code) {
      // 백엔드로 코드 전송
      axios
        .post('https://hansang.o-r.kr/api/user/social-login/google/callback/', {
          code,
        })
        .then((response) => {
          const data = response.data;
          localStorage.setItem('tokens', JSON.stringify(data));
          // 성공 시 메인 페이지로 이동
          window.location.href = '/';
        })
        .catch((error) => {
          console.error('구글 로그인 실패', error);
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
