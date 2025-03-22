import { handleLogout } from '@/api/TokenApi';
import { Link } from 'react-router';

export default function TopNav() {
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
    </div>
  );
}
