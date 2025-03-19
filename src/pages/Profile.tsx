import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';

export default function Profile() {
  return (
    <main className="flex flex-col items-center justify-center pt-[100px] pl-[200px]">
      <section className="flex max-w-5xl flex-col gap-4">
        <h1>회원정보</h1>
        <img src="" alt="프로필사진" />
        <p>이메일: </p>
        <Input />
        <p>전화번호: </p>
        <Input />
        <p>알람받기: </p>
        {/* 스위치 넣을 예정 */}
        <Link to="/profile/">
          <Button>회원탈퇴</Button>
        </Link>
        <Link to="/profile/profile-edit">
          <Button>회원 정보 수정</Button>
        </Link>
      </section>
    </main>
  );
}
