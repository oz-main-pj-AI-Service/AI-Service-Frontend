import { Link } from 'react-router';
import { Button } from '../ui/button';
import { useUserTokenTemp } from '@/hooks/useUserTokenTemp';
import { loginApiTemp } from '@/api/loginApiTemp';
import { handleLogout } from '@/pages/user/handleLogout';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function TopNav() {
  const [isLogin, setIsLogin] = useState(false);
  const { accessToken } = useAuthStore();
  // console.log(accessToken);

  // 임시 로그인
  const { refetch: refetchUserToken } = useUserTokenTemp('user');
  const { refetch: refetchAdminToken } = useUserTokenTemp('admin');

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    }
  }, []);
  return (
    <div className="fixed top-0 z-1 flex w-full items-center justify-end gap-4 px-8 py-4">
      {/* 임시 로그인 */}
      {loginApiTemp.getAccessTokenTemp() ? (
        <Button
          onClick={() => {
            loginApiTemp.logOut();
          }}
        >
          로그아웃
        </Button>
      ) : (
        <>
          <Button
            onClick={() => {
              console.log('관리자 로그인');
              refetchAdminToken();
            }}
          >
            관리자 로그인
          </Button>
          <Button
            onClick={() => {
              console.log('유저 로그인');
              refetchUserToken();
            }}
          >
            임시 로그인
          </Button>
        </>
      )}

      {accessToken ? (
        <>
          <Link to="/profile">회원정보</Link>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to="/sign-in">로그인</Link>
          <Link to="/sign-up">회원가입</Link>
        </>
      )}
    </div>
  );
}
