import { useAuthStore } from '@/stores/authStore';
import { Link } from 'react-router';

export default function MobileAdminTopNav() {
  const { admin } = useAuthStore();

  return (
    <>
      {admin && (
        <nav className="fixed bottom-0 left-0 z-10 flex h-16 w-full items-center justify-around bg-[var(--bg-light-point)] px-4 py-4 max-sm:top-0 min-lg:hidden dark:bg-[var(--bg-dark-point)]">
          <Link
            to="/admin/users/page?p=1"
            className="flex h-full w-1/3 items-center justify-center"
          >
            회원 관리
          </Link>
          <Link
            to="/admin/reports/page?p=1"
            className="flex h-full w-1/3 items-center justify-center"
          >
            문의 사항
          </Link>
          <Link
            to="/admin/ai/all/page?p=1"
            className="flex h-full w-1/3 items-center justify-center"
          >
            ai 로그
          </Link>
        </nav>
      )}
    </>
  );
}
