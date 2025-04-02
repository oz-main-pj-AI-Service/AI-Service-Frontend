import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/authStore';
import { handleLogout } from '../user/handleLogout';
import { Button } from '@/components/ui/button';

export default function MobileMyPage() {
  const navigate = useNavigate();
  const { accessToken, admin } = useAuthStore();

  if (!accessToken) {
    navigate('/sign-in');
  }

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pb-20">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-center text-xl font-bold md:text-2xl">마이페이지</h2>
          <ul className="flex flex-wrap justify-center gap-4">
            <li className="h-44 w-44 rounded-lg border">
              <Link to="/profile" className="flex h-full w-full items-center justify-center">
                회원 정보
              </Link>
            </li>
            <li className="h-44 w-44 rounded-lg border">
              <Button
                onClick={handleLogout}
                variant="link"
                className="flex h-full w-full items-center justify-center"
              >
                로그아웃
              </Button>
            </li>
            <li className="h-44 w-44 rounded-lg border">
              <Link to="/report/post" className="flex h-full w-full items-center justify-center">
                문의하기
              </Link>
            </li>
            <li className="h-44 w-44 rounded-lg border">
              <Link
                to="/report/page?p=1"
                className="flex h-full w-full items-center justify-center"
              >
                문의사항 목록보기
              </Link>
            </li>
            {admin && (
              <li className="h-44 w-44 rounded-lg border">
                <Link
                  to="/admin/users/page?p=1"
                  className="flex h-full w-full items-center justify-center"
                >
                  관리자 페이지
                </Link>
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
