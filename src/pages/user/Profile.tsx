import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';
import 한상로고 from '@/assets/한상로고.png';

export default function Profile() {
  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex h-screen items-center justify-center">
        <section className="mb-4 flex w-96 flex-col gap-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
          <h1>
            <img src={한상로고} alt="" />
          </h1>
          <h1>회원정보</h1>
          <img src="" alt="프로필사진" />
          <p>이메일 </p>
          <Input />
          <p>전화번호 </p>
          <Input />
          <p>알람받기 </p>
          {/* 스위치 넣을 예정 */}
          <hr />
          <Link to="/profile/">
            <Button>회원탈퇴</Button>
          </Link>
          <Link to="/profile/profile-edit">
            <Button>회원 정보 수정</Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
