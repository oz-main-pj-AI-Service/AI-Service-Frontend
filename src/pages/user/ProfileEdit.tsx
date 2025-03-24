import { Button } from '@/components/ui/button';

export default function ProfileEdit() {
  return (
    <main className="flex flex-col items-center justify-center pt-[100px] pl-[200px]">
      <section className="flex max-w-5xl flex-col gap-4">
        <h1>회원정보수정</h1>
        <img src={''} alt="프로필사진" />
        <button>이미지 업로드</button>
        <label>
          닉네임
          <input type="text" />
        </label>
        <label>
          이메일
          <input type="email" />
          <Button>인증하기</Button>
        </label>
        <input type="password" placeholder="비밀번호" />
        <input type="password" placeholder="비밀번호 확인" />
        <Button>변경사항 저장</Button>
      </section>
    </main>
  );
}
