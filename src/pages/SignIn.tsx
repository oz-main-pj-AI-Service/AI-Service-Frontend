import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignIn() {
  return (
    <main className="flex flex-col items-center justify-center pt-[100px] pl-[200px]">
      <section className="flex max-w-5xl flex-col gap-2">
        <img src="" alt="한상비서로고" />
        <p>
          회원이 아니신가요?<Link to="/sign-up">회원가입 하기</Link>
        </p>
        <label>
          이메일
          <Input type="email" placeholder="hansang@example.com" />
        </label>
        <label>
          비밀번호
          <Input type="password" placeholder="비밀번호" />
        </label>
        <div className="flex gap-4">
          <Link to="/sign-in/find-id">아이디 찾기</Link>
          <Link to="/sign-in/find-pw">비밀번호 찾기</Link>
        </div>
        <Button>로그인하기</Button>
        <p>sns 간편 로그인</p>
        <Button>네이버</Button>
        <Button>구글</Button>
      </section>
    </main>
  );
}
