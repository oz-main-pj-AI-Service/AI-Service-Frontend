import { useEffect } from 'react';
import axios from 'axios';

const NaverCallbackPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code) {
      axios.post('/api/user/social-login/naver/callback/', {
        code: code,
        state: state,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, []);

  return 
    <div>콜백 페이지</div>;
};
export default NaverCallbackPage;