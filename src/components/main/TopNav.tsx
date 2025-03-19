import { Link } from 'react-router';

export default function TopNav() {
  return (
    <div className="fixed top-0 z-1 flex w-full items-center justify-end gap-4 px-8 py-4">
      <Link to="/sign-in">로그인</Link>
      <Link to="/sign-up">회원가입</Link>
      <Link to="/profile">회원정보</Link>
    </div>
  );
}
