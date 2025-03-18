import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

//이메일에 인증 완료되면 여기로 이동하게 만들어야 함
export default function EditPw() {
  return (
    <main className="flex flex-col items-center justify-center pl-[200px]">
      <section className="flex max-w-5xl flex-col gap-4">
        <img src="" alt="한상비서로고" />
        <h1>비밀번호 변경</h1>
        <label>
          새 비밀번호
          <Input type="password" placeholder="새 비밀번호" />
        </label>
        <label>
          새 비밀번호 확인
          <Input type="password" placeholder="새 비밀번호 확인" />
        </label>
        <Button>변경 완료</Button>
      </section>
    </main>
  );
}
