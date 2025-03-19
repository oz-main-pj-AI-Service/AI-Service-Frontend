import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';

export default function SignUp() {
  return (
    <main className="flex flex-col items-center justify-center pt-[50px] pl-[200px]">
      <section className="flex max-w-5xl flex-col gap-2">
        <img src="" alt="한상비서로고" />
        <p>
          회원이신가요?<Link to="/sign-in">로그인하기</Link>
        </p>
        <label>
          이메일
          <Input type="email" placeholder="hansang@example.com" />
          <Button>중복확인</Button>
        </label>
        <label>
          비밀번호
          <Input type="password" placeholder="비밀번호" />
        </label>
        <label>
          비밀번호 확인
          <Input type="password" placeholder="비밀번호 확인" />
        </label>
        <label>
          전화번호
          <Input type="tel" placeholder="010-0000-0000" />
        </label>
        <div className="flex gap-4">
          <Link to="/sign-in/find-id">아이디 찾기</Link>
          <Link to="/sign-in/find-pw">비밀번호 찾기</Link>
        </div>
        <p>
          <input type="checkbox" />
          개인정보 수집에 동의합니다
        </p>
        <Button>가입하기</Button>
        <p>sns 간편 회원가입</p>
        <Button>네이버</Button>
        <Button>구글</Button>
      </section>
    </main>
  );
}
//가입완료 팝업 띄우기
