import { useEffect } from 'react';
import axios from 'axios';

const RedirectPage = () => {
  useEffect(() => {
    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get('code');
    // const state = urlParams.get('state');
    // console.log(code);

    if (code) {
      // 백엔드로 코드 전송
      axios
        .post('https://api.hansang.o-r.kr/api/user/social-login/naver/callback/', {
          code,
          // state,
        })
        .then((response) => {
          console.log(response.data);
          // 성공 시 메인 페이지로 이동
          window.location.href = '/';
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return <div>회원가입 중...</div>;
};

export default RedirectPage;
