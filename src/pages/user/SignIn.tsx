//로그인
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { goGoogleSignUp, goNaverSignUp } from './SocialSignUp';

const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;

export default function SignIn() {
  console.log(clientId);

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="mb-4 flex w-96 flex-col gap-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <img src="" alt="한상비서로고" className="w-full" />
        <h2 className="mb-4 text-lg font-bold">로그인</h2>
        <p>
          회원이 아니신가요?<Link to="/sign-up">회원가입 하기</Link>
        </p>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">이메일</label>
          <Input
            type="email"
            placeholder="hansang@example.com"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">비밀번호</label>
          <Input
            type="password"
            placeholder="비밀번호"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="flex gap-4">
          <Link to="/sign-in/find-id">아이디 찾기</Link>
          <Link to="/sign-in/find-pw">비밀번호 찾기</Link>
        </div>
        <Button>로그인하기</Button>
        <p>sns 간편 로그인</p>
        <Button onClick={() => goNaverSignUp()}>네이버</Button>
        <Button onClick={() => goGoogleSignUp()}>구글</Button>
      </form>
    </div>
  );
}
