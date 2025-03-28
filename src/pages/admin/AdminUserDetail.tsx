import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router';

export default function AdminUserDetail() {
  const { id } = useParams();

  // 특정 사용자 정보 조회 api 호출 (쿼리 or 서스펜스쿼리)
  // 특정 사용자 강제 탈퇴 api 호출 (뮤테이션?)
  // api/user/admin/id/

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-bold">회원 상세 정보</h2>
          <span className="text-sm text-gray-500">유저 아이디: {id}</span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2 pb-4">
                <span className="font-bold">프로필 이미지</span>
                <img
                  src="https://placehold.co/100x100"
                  alt="프로필 이미지"
                  draggable={false}
                  className="h-36 w-36 rounded-full"
                />
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">이메일</span>
                <span className="font-extralight">emailsample1234@example.com</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">유저네임</span>
                <span className="font-extralight">한상코더</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">전화번호</span>
                <span className="font-extralight">010-1234-5678</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">가입일</span>
                <span className="font-extralight">2025-03-26</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">소셜계정 여부</span>
                <span className="font-extralight">O</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">이메일 인증 여부</span>
                <span className="font-extralight">O</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">상태</span>
                <span className="font-extralight">Active</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">활동</span>
                <span className="font-extralight">뭐더라 이게</span>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <Button className="w-1/2" variant="destructive">
                강제 탈퇴
              </Button>
              <Button className="w-1/2" asChild>
                <Link to={`/admin/users/edit/${id}`}>수정</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
