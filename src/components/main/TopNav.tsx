import { Link } from 'react-router';

export default function TopNav() {
  return (
    <div className="flex items-center justify-end gap-4 px-8 py-4">
      <Link to="/sign-in">로그인</Link>
      <Link to="/sign-up">회원가입</Link>
    </div>
  );
}
