import { handleLogout } from '@/api/TokenApi';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { useUserTokenTemp } from '@/hooks/useUserTokenTemp';

export default function TopNav() {
<<<<<<< HEAD
  const accessToken = localStorage.getItem('accessToken');

  return (
    <div className="fixed top-0 z-1 flex w-full items-center justify-end gap-4 px-8 py-4">
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
=======
  const { refetch } = useUserTokenTemp();

  const handleLogin = () => {
    refetch().then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="fixed top-0 z-1 flex w-full items-center justify-end gap-4 px-8 py-4">
      {/* 임시 로그인 (로그인 구현 완료시 삭제) */}
      <Button onClick={handleLogin}>임시 로그인</Button>

      <Link to="/sign-in">로그인</Link>
      <Link to="/sign-up">회원가입</Link>
      <Link to="/profile">회원정보</Link>
>>>>>>> develop
    </div>
  );
}
