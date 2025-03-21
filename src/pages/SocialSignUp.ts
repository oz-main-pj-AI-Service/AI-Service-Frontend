const NaverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
const NaverCallbackUrl = import.meta.env.VITE_NAVER_CALLBACK_URI;
const NaverState = 'RANDOM_STATE';

// const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GoogleCallbackUrl = import.meta.env.VITE_GOOGLE_CALLBACK_URI;

const goNaverSignUp = () => {
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${NaverClientId}&redirect_uri=${NaverCallbackUrl}&response_type=code&scope=email&state=${NaverState}`;

  window.location.href = naverUrl;
};

const goGoogleSignUp = () => {
  const googleURl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1886796406-999482itjb2itl4n34hoqnn4m31jkukb.apps.googleusercontent.com&redirect_uri=${GoogleCallbackUrl}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  // `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GoogleClientId}&redirect_uri=${GoogleCallbackUrl}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  //`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${GoogleClientId}&redirect_uri=${GoogleCallbackUrl}`;

  window.location.href = googleURl;
};
export { goNaverSignUp, goGoogleSignUp };
