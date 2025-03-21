import { useEffect } from 'react';
import axios from 'axios';

interface TokenData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

const handleResponseData = (data: any) => {
  const tokenData: TokenData = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
  };

  localStorage.setItem('accessToken', tokenData.accessToken);
  localStorage.setItem('refreshToken', tokenData.refreshToken);
  localStorage.setItem('tokenType', tokenData.tokenType);
  localStorage.setItem('expiresIn', String(tokenData.expiresIn));
};

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
          handleResponseData(data);
          // window.location.href = '/';
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
          handleResponseData(data);
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
export { handleResponseData };
