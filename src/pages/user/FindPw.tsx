import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FindPw() {
  return (
    <main className="flex flex-col items-center justify-center pt-[100px] pl-[200px]">
      <section className="flex max-w-5xl flex-col gap-4">
        <img src="" alt="한상비서로고" />
        <h1>비밀번호 찾기</h1>
        <label>
          이메일
          <Input type="email" placeholder="hansang@example.com" />
        </label>
        <Button>본인 인증</Button>
      </section>
    </main>
  );
}
//모달로 이메일을 확인해주세요 띄우기
