import { Button } from '@/components/ui/button';
import { useAdminUserDeleteQuery, useAdminUserDetailQuery } from '@/hooks/useAdminQuery';
import { formatDateYMD } from '@/lib/utils';
import { Link, useNavigate, useParams } from 'react-router';

export default function AdminUserDetail() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  console.log(id);

  // 특정 사용자 정보 조회 api 호출 (쿼리 or 서스펜스쿼리)
  const { data: user } = useAdminUserDetailQuery(id);
  console.log(user);

  // 특정 사용자 강제 탈퇴 api 호출 (뮤테이션?)
  const deleteMutation = useAdminUserDeleteQuery();

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
                <span className="font-extralight">{user?.email}</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">유저네임</span>
                <span className="font-extralight">{user?.nickname}</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">전화번호</span>
                <span className="font-extralight">{user?.phone_number}</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">가입일</span>
                {/* 서스펜스쿼리로 바꾸고 물음표 다 떼기 */}
                <span className="font-extralight">{formatDateYMD(user?.created_at ?? '')}</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">소셜계정 여부</span>
                <span className="font-extralight">{user?.is_social ? 'O' : 'X'}</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">이메일 인증 여부</span>
                <span className="font-extralight">{user?.email_verified ? 'O' : 'X'}</span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">상태</span>
                <span className="font-extralight">{user?.is_active ? 'Active' : 'Inactive'} </span>
              </div>
              <div className="flex justify-between gap-2 border-b pb-4">
                <span className="font-extralight">활동</span>
                <span className="font-extralight">{user?.is_active ? 'O' : 'X'}</span>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <Button
                className="w-1/2"
                variant="destructive"
                // 사실 이걸 바로 지우면 안되고, 모달을 띄워야함. 그리고 모달에 이걸 전달
                onClick={() =>
                  deleteMutation.mutate(id, {
                    onSuccess: () => {
                      navigate(`/admin/users/page?p=1`);
                    },
                  })
                }
              >
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
