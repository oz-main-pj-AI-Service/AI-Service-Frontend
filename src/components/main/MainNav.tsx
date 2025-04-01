import { Link, NavLink } from 'react-router';
import useDarkMode from '@/stores/darkmode';
import logo from '@/assets/logo.png';
import logo_black from '@/assets/logo_black.png';


export default function MainNav() {
  const { isDarkMode } = useDarkMode();

  return (
    <nav className="fixed top-0 left-0 z-10 flex h-full w-[200px] flex-col items-center justify-between bg-[var(--bg-light-point)] py-6 dark:bg-[var(--bg-dark-point)]">
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
      <div className="flex flex-col gap-2">
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
      </div>

      {/* 관리자 페이지와 문의하기 중에서 조건부 렌더링 (isAdmin) */}
      <div className="w-36 rounded-sm py-2 text-center hover:bg-zinc-300 dark:hover:bg-zinc-800">
        <Link to="/admin/users/page?p=1" draggable={false}>
          관리자 페이지
        </Link>
      </div>

      <div className="w-36 rounded-sm py-2 text-center hover:bg-zinc-300 dark:hover:bg-zinc-800">
        <Link to="/report/post" draggable={false}>
          문의하기
        </Link>
      </div>
    </nav>
  );
}

// React Router에서 NavLink 스타일링 하는거 차례대로 3가지
// 3번째 {children}을 사용하는 방법으로
// 따로 컴포넌트화 하기
