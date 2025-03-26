import { Link } from 'react-router';
import { Button } from '../ui/button';
import { useUserTokenTemp } from '@/hooks/useUserTokenTemp';
import { loginApiTemp } from '@/api/loginApiTemp';
import { handleLogout } from '@/pages/user/handleLogout';

export default function TopNav() {
  const accessToken = localStorage.getItem('accessToken');

  // 임시 로그인
  const { refetch } = useUserTokenTemp();

  return (
    <div className="fixed top-0 z-1 flex w-full items-center justify-end gap-4 px-8 py-4">
      {/* 임시 로그인 */}
      {loginApiTemp.getAccessTokenTemp() ? (
        <Button onClick={() => refetch()}>로그인 완료</Button>
      ) : (
        <Button onClick={() => refetch()}>임시 로그인</Button>
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
