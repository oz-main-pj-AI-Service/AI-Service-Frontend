import { Link, NavLink, useNavigate } from 'react-router';
import useDarkMode from '@/stores/darkmode';
import { useAuthStore } from '@/stores/authStore';
import logo from '@/assets/logo.png';
import logo_black from '@/assets/logo_black.png';
import { handleLogout } from '@/pages/user/handleLogout';
import { Button } from '../ui/button';

export default function MainNav() {
  const { isDarkMode } = useDarkMode();
  const { accessToken, admin } = useAuthStore();
  const navigate = useNavigate();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 z-10 flex items-center justify-between bg-[var(--bg-light-point)] py-1 max-sm:hidden sm:w-full lg:h-full lg:w-[200px] lg:flex-col lg:py-6 dark:bg-[var(--bg-dark-point)]">
      {isDarkMode ? (
        <h1 className="max-lg:px-8">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </h1>
      ) : (
        <h1 className="max-lg:px-8">
          <Link to="/">
            <img src={logo_black} alt="" />
          </Link>
        </h1>
      )}

      {/* 메뉴 목록 */}
      <nav className="flex grow gap-2 lg:flex-col lg:py-28">
        <NavLink to="/" draggable={false}>
          {({ isActive }) => {
            isActive = isActive || location.pathname.startsWith('/recipe');
            return (
              <div
                className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-800'} w-24 rounded-sm py-2 max-lg:text-center lg:w-36 lg:pl-4`}
              >
                레시피
              </div>
            );
          }}
        </NavLink>
        <NavLink to="/menu" draggable={false}>
          {({ isActive }) => {
            isActive = isActive || location.pathname.startsWith('/menu');
            return (
              <div
                className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-800'} w-24 rounded-sm py-2 max-lg:text-center lg:w-36 lg:pl-4`}
              >
                메뉴
              </div>
            );
          }}
        </NavLink>
        <NavLink to="/diet" draggable={false}>
          {({ isActive }) => {
            isActive = isActive || location.pathname.startsWith('/diet');
            return (
              <div
                className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-800'} w-24 rounded-sm py-2 max-lg:text-center lg:w-36 lg:pl-4`}
              >
                식단
              </div>
            );
          }}
        </NavLink>
        <NavLink to="/history/all/page?p=1" draggable={false}>
          {({ isActive }) => {
            isActive = isActive || location.pathname.startsWith('/history');
            return (
              <div
                className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-800'} w-24 rounded-sm py-2 max-lg:text-center lg:w-36 lg:pl-4`}
              >
                추천 기록
              </div>
            );
          }}
        </NavLink>
      </nav>

      {/* 관리자 페이지와 문의하기 중에서 조건부 렌더링 (isAdmin) */}
      {admin ? (
        <div className="rounded-sm bg-[var(--point-orange)] text-center hover:cursor-pointer hover:opacity-80 max-lg:px-4 lg:w-36">
          <Link to="/admin/users/page?p=1" draggable={false} className="block w-full py-2 text-sm">
            관리자
          </Link>
        </div>
      ) : (
        <div className="rounded-sm text-center hover:cursor-pointer hover:bg-zinc-300 lg:w-36 dark:hover:bg-zinc-800">
          <Link to="/report/post" draggable={false} className="block w-full py-2">
            문의하기
          </Link>
        </div>
      )}

      <div className="flex gap-1 max-lg:flex-col max-lg:px-8 lg:hidden">
        {accessToken ? (
          <>
            <Button variant="outline" onClick={() => navigate('/profile')}>
              회원정보
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => navigate('/sign-in')}>
              로그인
            </Button>
            <Button variant="outline" onClick={() => navigate('/sign-up')}>
              회원가입
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

// React Router에서 NavLink 스타일링 하는거 차례대로 3가지
// 3번째 {children}을 사용하는 방법으로
// 따로 컴포넌트화 하기
