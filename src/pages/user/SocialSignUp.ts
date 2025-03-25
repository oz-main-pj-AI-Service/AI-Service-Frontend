const NaverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
const NaverCallbackUrl = import.meta.env.VITE_NAVER_CALLBACK_URI;
const NaverState = 'RANDOM_STATE';

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GoogleCallbackUrl = import.meta.env.VITE_GOOGLE_CALLBACK_URI;

const goNaverSignUp = () => {
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${NaverClientId}&redirect_uri=${NaverCallbackUrl}&response_type=code&scope=email&state=${NaverState}`;

  window.location.href = naverUrl;
};

const goGoogleSignUp = () => {
  const googleURl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GoogleClientId}&redirect_uri=${GoogleCallbackUrl}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  window.location.href = googleURl;
};

const goNaverSignIn = () => {
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${NaverClientId}&redirect_uri=${NaverCallbackUrl}&response_type=code&scope=email&state=${NaverState}&prompt=none`;
  window.location.href = naverUrl;
};

const goGoogleSignIn = () => {
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GoogleClientId}&redirect_uri=${GoogleCallbackUrl}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&prompt=none`;
  window.location.href = googleUrl;
};

export { goNaverSignUp, goGoogleSignUp, goNaverSignIn, goGoogleSignIn };
