import { Link, NavLink } from 'react-router';
import useDarkMode from '@/stores/darkmode';
import { useAuthStore } from '@/stores/authStore';
import logo from '@/assets/logo.png';
import logo_black from '@/assets/logo_black.png';

export default function MainNav() {
  const { isDarkMode } = useDarkMode();
  const { admin } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 z-10 flex h-full w-[200px] flex-col items-center justify-between bg-[var(--bg-light-point)] py-6 max-lg:hidden dark:bg-[var(--bg-dark-point)]">
      {isDarkMode ? (
        <h1>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </h1>
      ) : (
        <h1>
          <Link to="/">
            <img src={logo_black} alt="" />
          </Link>
        </h1>
      )}

      {/* 메뉴 목록 */}
      <nav className="flex grow flex-col gap-2 py-28">
        <NavLink to="/" draggable={false}>
          {({ isActive }) => {
            isActive = isActive || location.pathname.startsWith('/recipe');
            return (
              <div
                className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-800'} w-36 rounded-sm py-2 pl-4`}
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
                className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-800'} w-36 rounded-sm py-2 pl-4`}
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
                className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-800'} w-36 rounded-sm py-2 pl-4`}
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
                className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-800'} w-36 rounded-sm py-2 pl-4`}
              >
                추천 기록
              </div>
            );
          }}
        </NavLink>
      </nav>

      {/* 관리자 페이지와 문의하기 중에서 조건부 렌더링 (isAdmin) */}
      {admin ? (
        <div className="w-36 rounded-sm bg-[var(--point-orange)] text-center hover:cursor-pointer hover:opacity-80">
          <Link to="/admin/users/page?p=1" draggable={false} className="block w-full py-2">
            관리자 페이지
          </Link>
        </div>
      ) : (
        <div className="w-36 rounded-sm text-center hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-800">
          <Link to="/report/post" draggable={false} className="block w-full py-2">
            문의하기
          </Link>
        </div>
      )}
    </header>
  );
}

// React Router에서 NavLink 스타일링 하는거 차례대로 3가지
// 3번째 {children}을 사용하는 방법으로
// 따로 컴포넌트화 하기
