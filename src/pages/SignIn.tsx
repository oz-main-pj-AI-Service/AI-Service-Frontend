import { Link } from 'react-router';

export default function SignIn() {
  return (
    <main className="flex justify-center pl-[200px]">
      <section className="max-w-5xl">
        <h2>로그인</h2>
        <Link to="/sign-in/find-id">아이디 찾기</Link>
        <Link to="/sign-in/find-pw">비밀번호 찾기</Link>
      </section>
    </main>
  );
}
