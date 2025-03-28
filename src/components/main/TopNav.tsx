import { Link } from 'react-router';
import { Button } from '../ui/button';
import { useUserTokenTemp } from '@/hooks/useUserTokenTemp';
import { loginApiTemp } from '@/api/loginApiTemp';
import useIsLogedIn from '@/stores/isLogin';
import { handleLogout } from '@/pages/user/handleLogout';

export default function TopNav() {
  const accessToken = localStorage.getItem('accessToken');


  return (
    <div className="fixed top-0 z-1 flex w-full items-center justify-end gap-4 px-8 py-4">
  // 임시 로그인
  const { isLogedIn, toggleIsLogedIn } = useIsLogedIn();
  const { refetch: refetchUserToken } = useUserTokenTemp('user');
  const { refetch: refetchAdminToken } = useUserTokenTemp('admin');

  return (
    <div className="fixed top-0 z-1 flex w-full items-center justify-end gap-4 px-8 py-4">
      {/* 임시 로그인 */}
      {isLogedIn ? (
        <Button
          onClick={() => {
            loginApiTemp.logOut();
            toggleIsLogedIn();
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
              toggleIsLogedIn();
            }}
          >
            관리자 로그인
          </Button>
          <Button
            onClick={() => {
              console.log('유저 로그인');
              refetchUserToken();
              toggleIsLogedIn();
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
